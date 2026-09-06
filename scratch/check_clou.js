const https = require('https');
const fs = require('fs');

https.get('https://www.clouarchitects.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[^>]+src=["']([^"']+)["']/g) || [];
    console.log('Scripts:', scripts);
    fs.writeFileSync('scratch/clou_page.html', data);
  });
});
