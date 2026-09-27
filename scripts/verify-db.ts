import { connectToDatabase } from '../src/lib/db';

async function verify() {
  console.log('🔎 Verifying MongoDB connection...');
  try {
    const result = await connectToDatabase();
    if (result.isConnected) {
      console.log('✅ Connected to MongoDB (mode:', result.mode, ')');
    } else {
      console.warn('⚠️ Unable to connect. Running in fallback mode.');
      console.warn('Reason:', result.error);
    }
  } catch (e) {
    console.error('❌ Unexpected error while connecting:', e);
  }
  process.exit();
}

verify();
