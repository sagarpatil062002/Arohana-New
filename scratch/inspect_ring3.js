const fs = require('fs');
const code = fs.readFileSync('scratch/clou_theme.js', 'utf8');

const idx = code.indexOf('configureMiniRing(){');
console.log(code.substring(idx, idx + 1000));
