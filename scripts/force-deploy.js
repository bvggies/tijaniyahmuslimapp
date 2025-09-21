#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Force deploying to Vercel with cache busting...');

try {
  // Update package.json version to force cache invalidation
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Increment patch version
  const versionParts = packageJson.version.split('.');
  versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
  packageJson.version = versionParts.join('.');
  
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  console.log(`📦 Updated version to ${packageJson.version}`);

  // Create a cache-busting file
  const cacheBuster = `Cache busted at: ${new Date().toISOString()}`;
  fs.writeFileSync(path.join(process.cwd(), 'public/cache-buster.txt'), cacheBuster);
  console.log('💾 Created cache buster file');

  // Commit the changes
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "Force deploy: ${packageJson.version} - ${new Date().toISOString()}"`, { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('✅ Force deployment completed!');
  console.log('🔄 Vercel should now rebuild and deploy the latest changes');
  console.log('⏱️  Please wait 2-3 minutes for the deployment to complete');
  
} catch (error) {
  console.error('❌ Force deployment failed:', error.message);
  process.exit(1);
}
