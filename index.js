import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import passport from 'passport';

import './controllers/strategy.js';
import { connect } from './connect.js';

// Route files
import steamRouter from './routes/steam.js';
import steamLibRouter from './routes/steamlib.js';
import guestbookRouter from './routes/guestbook.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

connect(MONGO_URL);

// Mount routes
app.use('/steam', steamRouter);           // GET /steam
app.use('/steam/library', steamLibRouter); // GET /steam/library
app.use('/guestbook', guestbookRouter);   // GET & POST /guestbook
app.use('/auth', authRouter);             // GET /auth/github, /auth/github/callback

app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
