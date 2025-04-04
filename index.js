import dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/steam', async (req, res) => {
    try {
        const { STEAM_API_KEY, STEAM_ID } = process.env;
        if (!STEAM_API_KEY || !STEAM_ID) {
            return res.status(500).json({ message: 'Missing required environment variables' });
        }
        const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true`;
        const response = await axios.get(url);
        if (response.status !== 200) {
            return res.status(500).json({
                message: 'Failed to retrieve data from Steam API'
            })
        }
        const data = await response.data;
        res.json(data);
    } catch {
        res.status(500).json({ message: 'Failed to retrieve data from Steam API' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port:${port}`)
});
