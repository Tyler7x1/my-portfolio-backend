import mongoose from 'mongoose';

const githubUserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  displayName: String,
  email: String,
  profileUrl: String,
  avatarUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const GitHubUser = mongoose.model('Portfolio', githubUserSchema);

export default GitHubUser;
