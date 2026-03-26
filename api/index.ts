import app from './server.js';
import { connectToDatabase } from './db.js';

export default async (req: any, res: any) => {
  try {
    const mongoUri = process.env.MONGODB_URI || '';
    if (!mongoUri) {
        console.error('Vercel: MONGODB_URI is missing!');
    }
    await connectToDatabase(mongoUri);
    return app(req, res);
  } catch (error: any) {
    console.error('Vercel function error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};
