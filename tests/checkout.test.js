import { before, after, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { hash } from 'argon2';
import { createApp } from '../configs/server.js';
import User from '../src/user/user.model.js';
import Product from '../src/products/products.model.js';
import Category from '../src/category/category.model.js';
import Cart from '../src/cart/cart.model.js';
import Invoice from '../src/invoice/invoice.model.js';

process.env.SECRETORPRIVATEKEY = 'synthetic-test-key-only-not-for-deployment-1234';
let replica, app, alice, bob, product, aliceToken, bobToken;
const auth = token => ({ Authorization: 'Bearer ' + token });
before(async () => {
    replica = await MongoMemoryReplSet.create({ binary: { version: '8.0.16' }, instanceOpts: [{ launchTimeout: 60000 }], replSet: { count: 1, storageEngine: 'wiredTiger' } });
    await mongoose.connect(replica.getUri());
    await Promise.all([User.init(), Product.init(), Cart.init(), Invoice.init()]);
    app = createApp();
});
after(async () => { await mongoose.disconnect(); if (replica) await replica.stop(); });
beforeEach(async () => {
    await Promise.all([User.deleteMany({}), Product.deleteMany({}), Cart.deleteMany({}), Invoice.deleteMany({}), Category.deleteMany({})]);
    const users = await User.create(['alice', 'bob'].map(name => ({ fullName: name, username: name, email: name + '@example.test', password: 'not-a-real-password', phone: '00000000' })));
    [alice, bob] = users;
    aliceToken = jwt.sign({uid: alice.id}, process.env.SECRETORPRIVATEKEY);
    bobToken = jwt.sign({uid: bob.id}, process.env.SECRETORPRIVATEKEY);
    const category = await Category.create({nameCategory: 'Demo', description: 'Synthetic data'});
    product = await Product.create({nameProduct: 'Demo product', category: category.id, price: 10.05, stock: 1});
});
const add = (token, quantity = 1) => request(app).post('/ventaOnline/v1/cart/addProductCart').set(auth(token)).send({ nameProduct: product.nameProduct, quantity });
const buy = token => request(app).post('/ventaOnline/v1/buy/completeBuy').set(auth(token)).send({});
test('competing buyers cannot oversell the final unit; losing cart stays intact', async () => {
    assert.equal((await add(aliceToken)).status, 200);
    assert.equal((await add(bobToken)).status, 200);
    assert.equal((await Product.findById(product.id)).stock, 1);
    const results = await Promise.all([buy(aliceToken), buy(bobToken)]);
    assert.deepEqual(results.map(result => result.status).sort(), [200, 409]);
    assert.equal((await Product.findById(product.id)).stock, 0);
    assert.equal((await Product.findById(product.id)).soldUnits, 1);
    assert.equal(await Invoice.countDocuments(), 1);
    const invoice = await Invoice.findOne();
    assert.equal(invoice.total, 10.05);
    assert.equal(invoice.products[0].totalProduct, 10.05);
    const loser = invoice.user.equals(alice.id) ? bob : alice;
    assert.equal((await Cart.findOne({user: loser.id})).products.length, 1);
});
test('double checkout produces a single purchase', async () => {
    await add(aliceToken);
    const results = await Promise.all([buy(aliceToken), buy(aliceToken)]);
    assert.deepEqual(results.map(result => result.status).sort(), [200, 409]);
    assert.equal(await Invoice.countDocuments(), 1);
});
test('failure on another line rolls back stock, invoice and cart', async () => {
    const absent = new mongoose.Types.ObjectId();
    await Cart.create({user: alice.id, products: [{product: product.id, quantity: 1}, {product: absent, quantity: 1}]});
    assert.equal((await buy(aliceToken)).status, 409);
    assert.equal((await Product.findById(product.id)).stock, 1);
    assert.equal(await Invoice.countDocuments(), 0);
    assert.equal((await Cart.findOne({user: alice.id})).products.length, 2);
});
test('cart removal never creates stock and invalid quantities are rejected', async () => {
    for (const quantity of [0, -1, 1.5, '1']) assert.equal((await add(aliceToken, quantity)).status, 400);
    await add(aliceToken);
    assert.equal((await request(app).delete('/ventaOnline/v1/cart/removeProduct/' + product.id).set(auth(aliceToken)).send({quantity: 999})).status, 200);
    assert.equal((await Product.findById(product.id)).stock, 1);
    assert.equal((await request(app).get('/ventaOnline/v1/cart/getCart').set(auth(bobToken))).body.cart.length, 0);
});
test('authentication, ownership and admin invoice access are enforced', async () => {
    assert.equal((await buy('invalid')).status, 401);
    await add(aliceToken);
    const purchase = await buy(aliceToken);
    const url = purchase.body.pdfPath;
    assert.equal((await request(app).get(url).set(auth(bobToken))).status, 404);
    const pdf = await request(app).get(url).set(auth(aliceToken));
    assert.equal(pdf.status, 200);
    assert.match(pdf.headers['content-type'], /pdf/);
    assert.equal((await request(app).get('/ventaOnline/v1/invoice/getInvoice/' + alice.id).set(auth(bobToken))).status, 403);
});
test('registration and profile update cannot assign privileged roles', async () => {
    const registration = await request(app).post('/ventaOnline/v1/auth/register').send({fullName: 'Demo user', username: 'new-user', email: 'new@example.test', password: 'Demo-password-123!', phone: '00000000', role: 'ADMIN_ROLE'});
    assert.equal(registration.status, 201);
    assert.equal((await User.findOne({username: 'new-user'})).role, 'CLIENT_ROLE');
    const stored = await User.findById(alice.id);
    stored.password = await hash('Demo-password-123!'); await stored.save();
    const response = await request(app).put('/ventaOnline/v1/user/editUser/').set(auth(aliceToken)).send({role: 'ADMIN_ROLE', fullName: 'Edited demo'});
    assert.equal(response.status, 200);
    assert.equal((await User.findById(alice.id)).role, 'CLIENT_ROLE');
    assert.equal(response.body.user.password, undefined);
});
