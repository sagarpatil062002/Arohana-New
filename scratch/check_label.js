const fs = require('fs');
const code = fs.readFileSync('scratch/clou_theme.js', 'utf8');

const labelIdx = code.indexOf('labelRenderer');
console.log('=== labelRenderer code ===');
console.log(code.substring(labelIdx, labelIdx + 1500));
