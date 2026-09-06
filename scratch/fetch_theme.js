const https = require('https');
const fs = require('fs');

https.get('https://www.clouarchitects.com/wp-content/themes/clou/public/scripts/theme.js?id=9f583c51a12e54d548fc', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scratch/clou_theme.js', data);
    console.log('theme.js downloaded, length:', data.length);
    const ringIdx = data.indexOf('mini-ring');
    console.log('mini-ring index:', ringIdx);
    if (ringIdx !== -1) {
      console.log('Context around mini-ring:', data.substring(Math.max(0, ringIdx - 200), Math.min(data.length, ringIdx + 800)));
    }
  });
});
