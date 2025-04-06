import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import { setter, getter } from '../controllers/redis.js';

dotenv.config();

const router = express.Router();

const { STEAM_API_KEY, STEAM_ID } = process.env;

router.get('/', async (req, res) => {
  try {
    const rKey = `library:${STEAM_ID}`;
    const cValue = await getter(rKey);

    if (cValue) {
      console.log('Cache Hit for Steam Library');
      return res.json(JSON.parse(cValue));
    }

    const response = await axios.get(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true&include_played_free_games=true`,
    );

    console.log('Cache Miss for Steam Library');
    await setter(rKey, JSON.stringify(response.data));
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Steam library' });
  }
});

export default router;
