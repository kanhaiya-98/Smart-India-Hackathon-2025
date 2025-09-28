import mongoose from 'mongoose';

export async function connectToDatabase(mongoUri: string): Promise<void> {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }
  await mongoose.connect(mongoUri);
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}


