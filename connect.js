import mongoose from 'mongoose';

async function connect(url){
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true
        });
        console.log('Connected to MongoDB');
    } catch {
        console.error("Error connecting to MongoDB", err);
    }
}

export { connect };