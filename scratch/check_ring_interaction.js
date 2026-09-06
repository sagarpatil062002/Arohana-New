const fs = require('fs');
const code = fs.readFileSync('scratch/clou_theme.js', 'utf8');

const rayIdx = code.indexOf('raycaster');
console.log('raycaster index:', rayIdx);
if (rayIdx !== -1) {
  console.log(code.substring(rayIdx - 100, rayIdx + 400));
}

const clickIdx = code.indexOf('miniRing');
let pos = 0;
while ((pos = code.indexOf('miniRing', pos)) !== -1) {
  console.log('miniRing usage at', pos, ':', code.substring(pos, pos + 120));
  pos += 8;
}
