import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRouter from './routes/auth';
import issuesRouter from './routes/issues';
import usersRouter from './routes/users';
import analyticsRouter from './routes/analytics';
import { connectToDatabase } from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/issues', issuesRouter);
app.use('/api/users', usersRouter);
app.use('/api/analytics', analyticsRouter);

const PORT = process.env.PORT || 4000;

// Export map for Vercel serverless functions
export default app;

async function start() {
  const mongoUri = process.env.MONGODB_URI || '';
  
  if (process.env.VERCEL) {
    if (mongoUri) {
      await connectToDatabase(mongoUri);
    }
    return;
  }

  try {
    await connectToDatabase(mongoUri);
    app.listen(PORT, () => {
      console.log(`Backend server ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

// Only call start() in local development
if (!process.env.VERCEL) {
  start();
}


