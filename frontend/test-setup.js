// Simple test to verify Next.js setup
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Next.js setup...\n');

// Check if essential files exist
const files = [
  'package.json',
  'next.config.js',
  'tsconfig.json',
  'next-env.d.ts',
  'tailwind.config.js',
  'postcss.config.js'
];

let allGood = true;

files.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allGood = false;
  }
});

// Check node_modules
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('✅ node_modules exists');
} else {
  console.log('❌ node_modules missing - run: npm install');
  allGood = false;
}

console.log('\n' + (allGood ? '🎉 Setup looks good!' : '⚠️  Some files are missing'));

if (allGood) {
  console.log('\n📝 Next steps:');
  console.log('1. Restart TypeScript server in VS Code');
  console.log('2. Run: npm run dev');
  console.log('3. Open: http://localhost:3000');
}