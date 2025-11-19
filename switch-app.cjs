#!/usr/bin/env node

/**
 * Switch between original and optimized App versions
 * Usage: node switch-app.js [original|optimized]
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const mode = args[0] || 'optimized';

const appPath = path.join(__dirname, 'src/App.tsx');
const optimizedAppPath = path.join(__dirname, 'src/OptimizedApp.tsx');
const originalAppBackup = path.join(__dirname, 'src/App.original.tsx');

if (mode === 'optimized') {
  console.log('🚀 Switching to optimized App...');
  
  // Backup original if it doesn't exist
  if (!fs.existsSync(originalAppBackup) && fs.existsSync(appPath)) {
    fs.copyFileSync(appPath, originalAppBackup);
    console.log('📁 Original App backed up');
  }
  
  // Switch to optimized
  if (fs.existsSync(optimizedAppPath)) {
    fs.copyFileSync(optimizedAppPath, appPath);
    console.log('✅ Switched to OptimizedApp');
  } else {
    console.log('❌ OptimizedApp.tsx not found');
    process.exit(1);
  }
  
} else if (mode === 'original') {
  console.log('📦 Switching to original App...');
  
  if (fs.existsSync(originalAppBackup)) {
    fs.copyFileSync(originalAppBackup, appPath);
    console.log('✅ Switched to original App');
  } else {
    console.log('❌ Original App backup not found');
    process.exit(1);
  }
  
} else {
  console.log('Usage: node switch-app.js [original|optimized]');
  process.exit(1);
}

console.log(`\n🎯 Current mode: ${mode}`);
console.log('Run "npm run dev" to see changes');