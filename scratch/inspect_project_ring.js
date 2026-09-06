const fs = require('fs');
const code = fs.readFileSync('scratch/clou_theme.js', 'utf8');

const ringIdx = code.indexOf('labelRenderer=');
console.log(code.substring(ringIdx - 300, ringIdx + 1200));
