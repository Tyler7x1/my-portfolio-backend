import mongoose from 'mongoose';

async function connect(url){
    try {
        await mongoose.connect(url, {
            ssl: true
        });
        console.log('Connected to MongoDB');
    } catch {
        throw Error;
    }
}

export { connect };