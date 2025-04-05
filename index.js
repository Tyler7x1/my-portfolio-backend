import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const { STEAM_API_KEY, STEAM_ID } = process.env;

app.use(cors());

app.get('/steam', async (req, res) => {
  try {
    if (!STEAM_API_KEY || !STEAM_ID) {
      return res.status(500).json({ message: 'Missing required environment variables' });
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

    res.json(player);
  } catch (error) {
    console.error('Steam Profile API Error:', error.message);
    res.status(500).json({ message: 'Failed to retrieve Steam profile data' });
  }
});

app.get('/steam/library', async (req, res) => {
    try {
      const response = await axios.get(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true&include_played_free_games=true`,
      );
      res.json(response.data);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch Steam library' });
    }
  });

app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
