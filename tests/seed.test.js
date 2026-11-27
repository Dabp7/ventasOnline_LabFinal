import {before,after,test} from 'node:test';
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import mongoose from 'mongoose';
import request from 'supertest';
import {MongoMemoryReplSet} from 'mongodb-memory-server';
import {createApp} from '../configs/server.js';
import User from '../src/user/user.model.js';
import Product from '../src/products/products.model.js';
import Category from '../src/category/category.model.js';

const execute=promisify(execFile);
let replica,uri;
process.env.SECRETORPRIVATEKEY='synthetic-seed-regression-secret-not-for-deployment';
before(async()=>{
    replica=await MongoMemoryReplSet.create({binary:{version:'8.0.16'},instanceOpts:[{launchTimeout:60000,args:['--wiredTigerCacheSizeGB','0.25']}],replSet:{count:1,storageEngine:'wiredTiger'}});
    uri=replica.getUri('venta_online_demo');
    await mongoose.connect(uri);
    await Promise.all([User.init(),Product.init(),Category.init()]);
});
after(async()=>{await mongoose.disconnect();if(replica)await replica.stop();});

test('a clean demo seed is idempotent and supports category reassignment with a protected fallback',async()=>{
    assert.equal(await User.countDocuments(),0);
    assert.equal(await Category.countDocuments(),0);
    for(let iteration=0;iteration<2;iteration++)await execute(process.execPath,['scripts/seed.js'],{env:{...process.env,URI_MONGO:uri},windowsHide:true,timeout:60000});
    const app=createApp();
    const login=await request(app).post('/ventaOnline/v1/auth/login').send({email:'admin@example.test',password:'Demo-password-123!'});
    assert.equal(login.status,200);
    const auth={Authorization:'Bearer '+login.body.userDetails.token};
    const normal=await Category.findOne({nameCategory:'Demo'});
    assert.ok(normal);
    const response=await request(app).delete('/ventaOnline/v1/category/deleteCategory/'+normal.id).set(auth);
    assert.equal(response.status,200,'Deleting a seeded normal category must reassign its products');
    const fallback=await Category.findOne({nameCategory:'Categoria Predeterminada'});
    assert.ok(fallback);
    assert.equal(await Category.countDocuments({nameCategory:'Categoria Predeterminada'}),1);
    assert.equal(await Category.countDocuments({_id:normal.id}),0);
    assert.equal(await User.countDocuments(),3);
    assert.equal(await Product.countDocuments(),1);
    assert.equal((await Product.findOne({nameProduct:'Demo product'})).category.toString(),fallback.id);
    assert.equal((await request(app).delete('/ventaOnline/v1/category/deleteCategory/'+fallback.id).set(auth)).status,409);
    assert.ok(await Category.exists({_id:fallback.id}));
});
