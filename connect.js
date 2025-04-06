import mongoose from 'mongoose';

async function connect(url){
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch {
        console.error("Error connecting to MongoDB");
    }
}

export { connect };