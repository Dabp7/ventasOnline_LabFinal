import mongoose from 'mongoose';
export const dbConnection = () => {
    if (!process.env.URI_MONGO) throw new Error('URI_MONGO is required');
    return mongoose.connect(process.env.URI_MONGO, { serverSelectionTimeoutMS: 5000, maxPoolSize: 20 });
};
