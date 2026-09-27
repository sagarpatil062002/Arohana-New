const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

function searchCommons(term) {
  return new Promise((resolve) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(term) + '&gsrlimit=10&prop=imageinfo&iiprop=url|size|mime&format=json';
    https.get(url, { headers: { 'User-Agent': 'ArohanaArmyBot/1.0 (contact@arohana.in)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const results = [];
          if (json.query && json.query.pages) {
            Object.values(json.query.pages).forEach(p => {
              const info = p.imageinfo && p.imageinfo[0];
              if (info && (info.mime === 'image/jpeg' || info.mime === 'image/png') && info.width > 800) {
                results.push({
                  title: p.title,
                  url: info.url,
                  width: info.width,
                  height: info.height
                });
              }
            });
          }
          resolve(results);
        } catch(e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

function download(imgUrl, destPath) {
  return new Promise((resolve) => {
    const client = imgUrl.startsWith('https') ? https : http;
    client.get(imgUrl, { headers: { 'User-Agent': 'ArohanaArmyBot/1.0 (contact@arohana.in)' } }, res => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          const stats = fs.statSync(destPath);
          console.log(`Saved: ${path.basename(destPath)} (${Math.round(stats.size/1024)} KB)`);
          resolve(true);
        });
      } else {
        console.log(`Failed to download ${imgUrl}: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (e) => {
      console.error(e.message);
      resolve(false);
    });
  });
}

async function run() {
  const tasks = [
    { term: 'Western Command Indian Army', name: 'western-command-official.jpg' },
    { term: 'Lieutenant General Harinder Singh Fire Fury Corps', name: 'firefury-corps-hq.jpg' },
    { term: 'Indian Army Ladakh Leh', name: '14corps-ladakh-ops.jpg' },
    { term: 'Hall of Fame, Indian Army War Memorial, Leh', name: '14corps-hall-of-fame.jpg' },
    { term: 'Indian Army Siachen Leh Ladakh', name: '14corps-mountain-front.jpg' },
    { term: 'Indian Army armoured tanks T-90', name: '69armoured-t90.jpg' }
  ];

  for (const t of tasks) {
    console.log('Searching for:', t.term);
    const results = await searchCommons(t.term);
    if (results.length > 0) {
      console.log(`Found ${results.length} files. Downloading top result: ${results[0].title}`);
      const dest = path.join(process.cwd(), 'public', 'images', 'army', t.name);
      await download(results[0].url, dest);
    } else {
      console.log('No files found for:', t.term);
    }
  }
}

run();
