import 'dotenv/config';
import mongoose from 'mongoose';
import { hash } from 'argon2';
import User from '../src/user/user.model.js';
import Category from '../src/category/category.model.js';
import Product from '../src/products/products.model.js';
if (!process.env.URI_MONGO || !process.env.URI_MONGO.includes('venta_online_demo')) throw new Error('Seed only accepts a database named venta_online_demo');
await mongoose.connect(process.env.URI_MONGO);
try {
    const password = await hash('Demo-password-123!');
    for (const [name, role] of [['admin', 'ADMIN_ROLE'], ['alice', 'CLIENT_ROLE'], ['bob', 'CLIENT_ROLE']]) {
        await User.updateOne({username: name}, {$setOnInsert: {fullName: 'Demo ' + name, username: name, email: name + '@example.test', password, phone: '00000000', role}}, {upsert:true});
    }
    await Category.updateOne({nameCategory:'Categoria Predeterminada'}, {$setOnInsert: {description:'Synthetic fallback for uncategorized demo products'}}, {upsert:true});
    const category = await Category.findOneAndUpdate({nameCategory:'Demo'}, {$setOnInsert: {description:'Synthetic catalog'}}, {new:true,upsert:true});
    await Product.updateOne({nameProduct:'Demo product'}, {$setOnInsert:{category:category.id,description:'Synthetic product',price:10.05,stock:5}}, {upsert:true});
    console.log('Demo ready: admin/alice/bob @example.test; password Demo-password-123!');
} finally { await mongoose.disconnect(); }
