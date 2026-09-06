const fs = require('fs');
const code = fs.readFileSync('scratch/clou_theme.js', 'utf8');

const ringIdx = code.indexOf('configureMiniRing()');
console.log(code.substring(ringIdx, ringIdx + 1500));
