const http = require('http');

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  try {
    console.log('--- 1. Testing Auth Check before login ---');
    const res1 = await request({ hostname: 'localhost', port: 3000, path: '/api/auth/check', method: 'GET' });
    console.log('Check before login:', res1.statusCode, res1.body);

    console.log('\n--- 2. Testing Login POST ---');
    const loginPayload = JSON.stringify({ email: 'admin@arohana.com', password: 'Arohana@2026' });
    const res2 = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(loginPayload) }
    }, loginPayload);
    console.log('Login status:', res2.statusCode);
    const setCookie = res2.headers['set-cookie'];
    console.log('Set-Cookie headers:', setCookie);

    console.log('\n--- 3. Testing Auth Check with Cookie ---');
    const authCookie = (setCookie || []).find(c => c.startsWith('arohana_admin_auth='));
    const cookieVal = authCookie ? authCookie.split(';')[0] : '';
    const res3 = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/check',
      method: 'GET',
      headers: { 'Cookie': cookieVal }
    });
    console.log('Check with cookie:', res3.statusCode, res3.body);

    console.log('\n--- 4. Testing Published API Content ---');
    const res4 = await request({ hostname: 'localhost', port: 3000, path: '/api/content?draft=false', method: 'GET' });
    const content = JSON.parse(res4.body);
    console.log('hasWhatWeDo in API:', !!content.data?.home?.whatWeDo);
    console.log('whatWeDo title:', content.data?.home?.whatWeDo?.title);

    console.log('\n--- 5. Testing Root SSR HTML for What We Do Section ---');
    const res5 = await request({ hostname: 'localhost', port: 3000, path: '/', method: 'GET' });
    console.log('SSR Status:', res5.statusCode);
    console.log('SSR HTML contains what-we-do:', res5.body.includes('what-we-do'));
    console.log('SSR HTML contains What We Do:', res5.body.includes('What We Do'));
    console.log('SSR HTML contains collage image:', res5.body.includes('1790913499091-hero--what-we-do-collage.png'));
  } catch (err) {
    console.error('Error during test:', err);
  }
})();
