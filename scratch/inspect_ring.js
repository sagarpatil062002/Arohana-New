const fs = require('fs');
const code = fs.readFileSync('scratch/clou_theme.js', 'utf8');

const ringIdx = code.indexOf('mini-ring');
console.log('=== BEFORE mini-ring ===');
console.log(code.substring(ringIdx - 1200, ringIdx));
console.log('=== AFTER mini-ring ===');
console.log(code.substring(ringIdx, ringIdx + 2500));
