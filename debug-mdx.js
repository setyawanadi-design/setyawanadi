const fs = require('fs');
const path = require('path');
// Mocking process.cwd to return current directory
const cwd = process.cwd();

// The path we are testing
const logsDirectory = path.join(cwd, 'src/content/logs');

console.log('--- MDX READ TEST ---');
console.log('Current Workign Directory:', cwd);
console.log('Target Logs Directory:', logsDirectory);

// 1. Check if directory exists
if (!fs.existsSync(logsDirectory)) {
    console.error('❌ ERROR: Directory does not exist!');
    process.exit(1);
} else {
    console.log('✅ Directory exists.');
}

// 2. List files
try {
    const files = fs.readdirSync(logsDirectory);
    console.log(`✅ Found ${files.length} files:`);
    files.forEach(f => console.log(` - ${f}`));

    if (files.length === 0) {
        console.warn('⚠️ WARNING: Directory is empty.');
    } else {
        console.log('✅ Content is visible to Node.js.');
    }

} catch (e) {
    console.error('❌ ERROR: Could not read directory:', e.message);
}
console.log('---------------------');
