import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

import GitHubUser from '../models/DataModel.js';

dotenv.config();

const strategy = passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://tylers-backend.onrender.com/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await GitHubUser.findOne({ githubId: profile.id });
  
      if (!user) {
        user = await GitHubUser.create({
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          profileUrl: profile.profileUrl,
          avatarUrl: profile.photos?.[0]?.value || '',
        });
      }
  
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));