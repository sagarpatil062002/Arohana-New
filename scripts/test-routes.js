const http = require('http');

const routes = [
  '/',
  '/about',
  '/services',
  '/work',
  '/work/raysons-group',
  '/work/loom-crafts',
  '/work/picturetime',
  '/work/she',
  '/work/misu',
  '/work/rr-skins',
  '/indian-army-projects',
  '/tourin',
  '/contact'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      resolve({ route, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ route, error: err.message });
    });
  });
}

async function run() {
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`${res.route.padEnd(25)} : ${res.status || res.error}`);
  }
}

run();
