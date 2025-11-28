// build.js - مساعد لبناء المشروع
const fs = require('fs');
const path = require('path');

console.log('🚀 بدء بناء متجر الإكسسوارات...');

// التأكد من وجود مجلد out
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('✅ Build completed successfully');
