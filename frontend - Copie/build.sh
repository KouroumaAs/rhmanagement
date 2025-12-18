#!/bin/bash

echo "🚀 Building Next.js application..."
npm run build

echo "📂 Copying public folder to standalone..."
cp -r public .next/standalone/

echo "📂 Copying static folder to standalone..."
cp -r .next/static .next/standalone/.next/

echo "✅ Build completed successfully!"
echo "📦 Standalone application is ready in .next/standalone/"
