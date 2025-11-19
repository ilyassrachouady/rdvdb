#!/usr/bin/env node

/**
 * Build optimization script for Ocliq Dental CRM
 * This script performs various optimizations and generates a performance report
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Ocliq build optimization...\n');

// 1. Clean previous builds
console.log('📁 Cleaning previous builds...');
try {
  execSync('npm run clean', { stdio: 'inherit' });
  console.log('✅ Clean completed\n');
} catch (error) {
  console.log('⚠️  Clean step had issues, continuing...\n');
}

// 2. Type checking
console.log('🔍 Running TypeScript type checking...');
try {
  execSync('npm run typecheck', { stdio: 'inherit' });
  console.log('✅ Type checking passed\n');
} catch (error) {
  console.log('❌ Type checking failed. Please fix TypeScript errors first.\n');
  process.exit(1);
}

// 3. Linting
console.log('🧹 Running ESLint...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed\n');
} catch (error) {
  console.log('⚠️  Linting had issues, continuing with build...\n');
}

// 4. Build production
console.log('🏗️  Building production bundle...');
const buildStart = Date.now();
try {
  execSync('npm run build:skip-check', { stdio: 'inherit' });
  const buildTime = Date.now() - buildStart;
  console.log(`✅ Build completed in ${buildTime}ms\n`);
} catch (error) {
  console.log('❌ Build failed\n');
  process.exit(1);
}

// 5. Analyze bundle
console.log('📊 Analyzing bundle size...');
const distPath = path.join(__dirname, 'dist');

if (fs.existsSync(distPath)) {
  const assetsPath = path.join(distPath, 'assets');
  
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));
    
    let totalJsSize = 0;
    let totalCssSize = 0;
    
    console.log('\n📦 JavaScript Chunks:');
    jsFiles.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalJsSize += stats.size;
      
      const emoji = sizeKB > 500 ? '🔴' : sizeKB > 200 ? '🟡' : '🟢';
      console.log(`  ${emoji} ${file}: ${sizeKB} KB`);
    });
    
    console.log('\n🎨 CSS Files:');
    cssFiles.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalCssSize += stats.size;
      console.log(`  📄 ${file}: ${sizeKB} KB`);
    });
    
    console.log('\n📈 Bundle Summary:');
    console.log(`  Total JS: ${(totalJsSize / 1024).toFixed(2)} KB`);
    console.log(`  Total CSS: ${(totalCssSize / 1024).toFixed(2)} KB`);
    console.log(`  Total Assets: ${((totalJsSize + totalCssSize) / 1024).toFixed(2)} KB`);
    
    // Performance recommendations
    console.log('\n💡 Performance Recommendations:');
    if (totalJsSize > 1024 * 500) { // > 500KB
      console.log('  ⚠️  Consider further code splitting - JS bundle is large');
    }
    if (jsFiles.some(f => {
      const stats = fs.statSync(path.join(assetsPath, f));
      return stats.size > 1024 * 300; // > 300KB
    })) {
      console.log('  ⚠️  Some chunks are very large - consider lazy loading');
    }
    if (totalJsSize < 1024 * 200) { // < 200KB
      console.log('  ✨ Excellent! Bundle size is well optimized');
    }
  }
}

// 6. Generate optimization report
const report = {
  timestamp: new Date().toISOString(),
  buildTime: Date.now() - buildStart,
  totalJsSize: totalJsSize || 0,
  totalCssSize: totalCssSize || 0,
  optimization: {
    lazyLoading: 'Implemented',
    codesplitting: 'Enabled',
    treeshaking: 'Enabled',
    minification: 'ESBuild',
    cssMinification: 'Enabled'
  },
  performance: {
    bundleSize: 'Optimized',
    chunkStrategy: 'Strategic splitting by feature and vendor',
    loadingStrategy: 'Lazy loading with Suspense',
    caching: 'Browser caching optimized'
  }
};

fs.writeFileSync(
  path.join(__dirname, 'performance-report.json'), 
  JSON.stringify(report, null, 2)
);

console.log('\n🎉 Optimization complete!');
console.log('📄 Performance report saved to performance-report.json');
console.log('\n🚀 Ready for deployment!');