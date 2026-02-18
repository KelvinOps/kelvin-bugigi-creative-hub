// check-env.mjs - Run with: node check-env.mjs
import dotenv from 'dotenv';
dotenv.config();

console.log('\n🔍 Checking environment variables...\n');

const required = [
  'DATABASE_URL',
  'DIRECT_URL',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

let allGood = true;

required.forEach(key => {
  const value = process.env[key];
  if (!value) {
    console.log(`❌ ${key} is NOT SET`);
    allGood = false;
  } else if (value.includes('[') || value.includes('YOUR')) {
    console.log(`⚠️  ${key} has placeholder value (not filled in yet)`);
    allGood = false;
  } else {
    const masked = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`✅ ${key} = ${masked}`);
  }
});

console.log('\n');

if (allGood) {
  console.log('✨ All environment variables are set correctly!\n');
  console.log('You can now run: npx prisma db push\n');
} else {
  console.log('🔧 Please update your .env file with the missing values.\n');
}
