import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.DATABASE_URL;

console.log('🔍 Testing connection to Neon...');
console.log('📡 Connection string:', connectionString.substring(0, 50) + '...');

// Clean the connection string
let cleanString = connectionString;
cleanString = cleanString.replace(/&channel_binding=require/g, '');

const pool = new pg.Pool({
  connectionString: cleanString,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
});

async function test() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT NOW() as time, version() as version');
    console.log('✅ Connected successfully!');
    console.log('🕐 Server time:', result.rows[0].time);
    console.log('📊 PostgreSQL version:', result.rows[0].version);
    console.log('✅ Test complete!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('📋 Full error:', error);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

test();