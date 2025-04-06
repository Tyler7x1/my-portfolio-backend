import mongoose from 'mongoose';

async function connect(url) {
  try {
    await mongoose.connect(url, {
      ssl: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    throw err;
  }
}

export { connect };
