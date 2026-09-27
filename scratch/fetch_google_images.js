const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function searchGoogleImages(query) {
  const url = 'https://www.google.com/search?tbm=isch&q=' + encodeURIComponent(query);
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const results = [];
        // Match high-res image URLs in script tags
        const regex = /\["(https:\/\/[^"]+?\.(?:jpg|jpeg|png))",\s*(\d+),\s*(\d+)\]/gi;
        let m;
        while ((m = regex.exec(data)) !== null) {
          const imgUrl = m[1];
          const width = parseInt(m[2], 10);
          const height = parseInt(m[3], 10);
          if (width > 400 && height > 300 && !imgUrl.includes('gstatic.com') && !imgUrl.includes('google.com')) {
            results.push({ url: imgUrl, width, height });
          }
        }
        resolve(results);
      });
    });
    req.on('error', (e) => {
      console.error('Request error:', e.message);
      resolve([]);
    });
  });
}

function downloadImage(imgUrl, destPath) {
  return new Promise((resolve) => {
    const client = imgUrl.startsWith('https') ? https : http;
    const req = client.get(imgUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://www.google.com/'
      },
      timeout: 10000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve);
      }
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(destPath);
          if (stats.size > 10000) {
            console.log(`Downloaded ${path.basename(destPath)} (${Math.round(stats.size/1024)} KB)`);
            resolve(true);
          } else {
            fs.unlinkSync(destPath);
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

async function run() {
  const searches = [
    {
      term: 'Western Command Indian Army Chandimandir investiture parade',
      filePrefix: 'western-command-google'
    },
    {
      term: 'Fire and Fury Corps Indian Army Ladakh Leh Headquarters',
      filePrefix: 'firefury-corps-google'
    },
    {
      term: '14 Corps Headquarters Indian Army Leh Ladakh soldiers',
      filePrefix: '14corps-google'
    }
  ];

  for (const s of searches) {
    console.log(`\nSearching Google Images for: "${s.term}"...`);
    const results = await searchGoogleImages(s.term);
    console.log(`Found ${results.length} candidate images.`);
    let downloaded = 0;
    for (let i = 0; i < results.length && downloaded < 3; i++) {
      const item = results[i];
      const ext = path.extname(new URL(item.url).pathname) || '.jpg';
      const targetPath = path.join(process.cwd(), 'public', 'images', 'army', `${s.filePrefix}-${downloaded + 1}${ext}`);
      console.log(`Trying ${item.url} (${item.width}x${item.height})...`);
      const success = await downloadImage(item.url, targetPath);
      if (success) {
        downloaded++;
      }
    }
  }
}

run();
