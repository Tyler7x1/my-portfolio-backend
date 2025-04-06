import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import { setter, getter } from '../controllers/redis.js';

dotenv.config();

const router = express.Router();

const { STEAM_API_KEY, STEAM_ID } = process.env;

router.get('/', async (req, res) => {
  try {
    if (!STEAM_API_KEY || !STEAM_ID) {
      return res.status(500).json({ message: 'Missing required environment variables' });
    }

    const rKey = `profile:${STEAM_ID}`;
    const rCache = await getter(rKey);

    if (rCache) {
      console.log('Cache Hit for Steam Profile');
      return res.json(JSON.parse(rCache));
    }

    const profileUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${STEAM_ID}`;
    const response = await axios.get(profileUrl);

    if (response.status !== 200) {
      return res.status(500).json({ message: 'Failed to fetch profile info from Steam API' });
    }

    const player = response.data.response.players?.[0];
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    console.log('Cache Miss for Steam Profile');
    await setter(rKey, JSON.stringify(player));
    res.json(player);
  } catch (error) {
    console.error('Steam Profile API Error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve Steam profile data' });
  }
});

export default router;
