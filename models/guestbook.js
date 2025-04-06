import mongoose from 'mongoose';

const userMsgSchema = new mongoose.Schema({
    user: {
      username: String,
      avatarUrl: String,
      profileUrl: String,
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });  

const UserMsg = mongoose.model('UserMsg', userMsgSchema);

export { UserMsg };
