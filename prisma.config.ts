import { defineConfig } from 'prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  throw new Error('DATABASE_URL is not set in environment variables');
}

console.log('✅ DATABASE_URL found:', connectionString.substring(0, 50) + '...');

// Clean the connection string - remove any problematic parameters
let cleanConnectionString = connectionString;
// Remove channel_binding if present (it can cause issues)
cleanConnectionString = cleanConnectionString.replace(/&channel_binding=require/g, '');
cleanConnectionString = cleanConnectionString.replace(/\?channel_binding=require/g, '');

console.log('🔗 Using cleaned connection string');

// Create a connection pool for Neon with optimized settings
const pool = new Pool({
  connectionString: cleanConnectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
  max: 10, // Reduce max connections for better stability
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increase timeout
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000,
});

// Create the Prisma adapter
const adapter = new PrismaPg(pool);

export default defineConfig({
  datasource: {
    url: cleanConnectionString,
  },
  adapter,
});

// Log connection events
pool.on('connect', () => {
  console.log('✅ Connected to Neon database');
});

pool.on('error', (err) => {
  console.error('❌ Database pool error:', err);
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

// Add a connection test function
export async function testConnection() {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT NOW() as time');
    console.log('🕐 Database time:', result.rows[0].time);
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return false;
  } finally {
    if (client) client.release();
  }
}