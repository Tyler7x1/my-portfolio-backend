import express from 'express';
import { UserMsg } from '../models/guestbook.js';
import authenticateJWT from '../middlewares/authJWT.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await UserMsg.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { message } = req.body;
    const { username } = req.user;
    const msgRecord = new UserMsg({
      user: {
        username,
        avatarUrl: `https://avatars.githubusercontent.com/${username}`,
        profileUrl: `https://github.com/${username}`,
      },
      message,
    });

    await msgRecord.save();
    res.status(201).json({ message: 'Guestbook message saved successfully' });
  } catch (error) {
    console.error('Guestbook Error:', error.message);
    res.status(500).json({ error: 'Failed to save guestbook message' });
  }
});

export default router;
