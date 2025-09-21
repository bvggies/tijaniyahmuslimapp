#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment with cache busting...');

// Generate a unique build ID
const buildId = Date.now().toString(36) + Math.random().toString(36).substr(2);
console.log(`📦 Build ID: ${buildId}`);

// Update service worker with new cache version
const swPath = path.join(__dirname, '../public/sw.js');
if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  
  // Replace the cache version with build ID
  swContent = swContent.replace(
    /const BUILD_VERSION = new Date\(\)\.getTime\(\);/,
    `const BUILD_VERSION = ${Date.now()};`
  );
  
  fs.writeFileSync(swPath, swContent);
  console.log('✅ Service worker updated with new cache version');
}

// Update package.json version for cache busting
const packagePath = path.join(__dirname, '../package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const versionParts = packageJson.version.split('.');
  versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
  packageJson.version = versionParts.join('.');
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log(`📝 Package version updated to: ${packageJson.version}`);
}

// Create a deployment marker file
const markerPath = path.join(__dirname, '../public/deployment-marker.txt');
fs.writeFileSync(markerPath, `Deployment: ${new Date().toISOString()}\nBuild ID: ${buildId}\n`);

console.log('📝 Deployment marker created');

// Deploy to Vercel
try {
  console.log('🌐 Deploying to Vercel...');
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('✅ Deployment successful!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}

// Clean up
if (fs.existsSync(markerPath)) {
  fs.unlinkSync(markerPath);
  console.log('🧹 Cleanup completed');
}

console.log('🎉 Deployment with cache busting completed!');
console.log('💡 Users will see updates immediately due to cache invalidation');
