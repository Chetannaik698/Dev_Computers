import mongoose from 'mongoose';
import app from './app.js';
import { initSeed } from './data/seed.js';
import { MONGO_URI, PORT } from './config.js';

async function start() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is not defined. Set it in .env.');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');
  await initSeed();

  app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
