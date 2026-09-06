const fs = require('fs');
const html = fs.readFileSync('scratch/clou_page.html', 'utf8');

const idx = html.indexOf('miniRingData');
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 1000));
} else {
  console.log('miniRingData not found directly in html');
}
