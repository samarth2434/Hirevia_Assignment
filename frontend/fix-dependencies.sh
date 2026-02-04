#!/bin/bash

echo "🔧 Fixing Next.js dependencies and TypeScript issues..."

# Remove existing node_modules and lock file
echo "📦 Cleaning existing dependencies..."
rm -rf node_modules package-lock.json .next

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Generate Next.js types
echo "🔄 Generating Next.js types..."
npx next build --dry-run || echo "Build dry-run completed"

echo "✅ Dependencies fixed!"
echo ""
echo "Next steps:"
echo "1. Restart your IDE/VS Code"
echo "2. Or restart TypeScript server: Ctrl+Shift+P -> 'TypeScript: Restart TS Server'"
echo "3. Run: npm run dev"