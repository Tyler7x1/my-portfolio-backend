import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

dotenv.config();

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  const user = req.user;

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.redirect(`http://jayprakash-malik.vercel.app/guestbook?token=${encodeURIComponent(token)}`);
});

export default router;
