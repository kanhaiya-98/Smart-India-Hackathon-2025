import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase(mongoUri: string): Promise<void> {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }

  try {
    const db = await mongoose.connect(mongoUri);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connection established');
    
    mongoose.connection.on('error', (err: any) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });
  } catch (err: any) {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  }
}
