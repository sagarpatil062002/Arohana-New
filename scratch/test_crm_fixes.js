const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 3000;
const HOME_JSON_PATH = path.join(process.cwd(), 'content', 'home.json');
const DRAFT_JSON_PATH = path.join(process.cwd(), 'content', 'drafts', 'home.json');

function postJson(urlPath, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path: urlPath,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch (e) {
            resolve({ status: res.statusCode, body });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getHtml(urlPath) {
  return new Promise((resolve, reject) => {
    http.get({ hostname: 'localhost', port: PORT, path: urlPath }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, html: body }));
    }).on('error', reject);
  });
}

// Strip Next.js JSON scripts so we test actual rendered DOM
function cleanDom(html) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

async function runTests() {
  console.log('=== STARTING CRM & WEBSITE PARITY TESTS ===\n');
  const originalHome = JSON.parse(fs.readFileSync(HOME_JSON_PATH, 'utf-8'));
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // Test 1: Save Draft vs Publish Live
    // -------------------------------------------------------------
    console.log('[TEST 1] Save Draft vs Publish Live Separation');
    const draftTestHeadline = 'DRAFT ONLY HEADLINE - NOT FOR LIVE WEBSITE';
    const draftPayload = JSON.parse(JSON.stringify(originalHome));
    draftPayload.hero.headline = draftTestHeadline;

    // Save as draft
    const draftRes = await postJson('/api/content/home', { data: draftPayload, action: 'draft' });
    assert(draftRes.status === 200 && draftRes.data.draftSaved === true, 'Save Draft endpoint returns success');
    assert(fs.existsSync(DRAFT_JSON_PATH), 'Draft file content/drafts/home.json was created on disk');

    const liveContent = JSON.parse(fs.readFileSync(HOME_JSON_PATH, 'utf-8'));
    assert(liveContent.hero.headline !== draftTestHeadline, 'Live content/home.json is NOT modified by Save Draft');

    // Publish Live
    const publishPayload = JSON.parse(JSON.stringify(originalHome));
    const publishedHeadline = 'PUBLISHED LIVE HEADLINE';
    publishPayload.hero.headline = publishedHeadline;

    const pubRes = await postJson('/api/content/home', { data: publishPayload, action: 'publish' });
    assert(pubRes.status === 200 && pubRes.data.published === true, 'Publish Live endpoint returns success');

    const publishedContent = JSON.parse(fs.readFileSync(HOME_JSON_PATH, 'utf-8'));
    assert(publishedContent.hero.headline === publishedHeadline, 'Live content/home.json is updated by Publish Live');
    assert(!fs.existsSync(DRAFT_JSON_PATH), 'Draft file content/drafts/home.json is cleaned up after publishing');

    // -------------------------------------------------------------
    // Test 2: Hero Section Enable / Disable Parity
    // -------------------------------------------------------------
    console.log('\n[TEST 2] Hero Section Enable / Disable / Re-enable Parity');

    // Step A: Disable Hero
    const disabledHeroData = JSON.parse(JSON.stringify(originalHome));
    disabledHeroData.hero.enabled = false;
    disabledHeroData.sections = disabledHeroData.sections.map((s) => s.id === 'hero' ? { ...s, visible: false } : s);
    await postJson('/api/content/home', { data: disabledHeroData, action: 'publish' });

    let pageRes = await getHtml('/');
    let dom = cleanDom(pageRes.html);
    assert(!dom.includes('id="hero-section"'), 'Hero section is completely removed from DOM when disabled');

    // Step B: Re-enable Hero
    const enabledHeroData = JSON.parse(JSON.stringify(originalHome));
    enabledHeroData.hero.enabled = true;
    enabledHeroData.sections = enabledHeroData.sections.map((s) => s.id === 'hero' ? { ...s, visible: true } : s);
    await postJson('/api/content/home', { data: enabledHeroData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(dom.includes('id="hero-section"'), 'Hero section is reliably visible again when re-enabled');

    // -------------------------------------------------------------
    // Test 3: Founder Portrait & Identity Card Controls (Section 03 Point of View)
    // -------------------------------------------------------------
    console.log('\n[TEST 3] Section 03 Point of View & Founder Card Granular Visibility');

    // Step A: Disable entire founder card
    const noCardData = JSON.parse(JSON.stringify(originalHome));
    noCardData.pov.founderCardEnabled = false;
    await postJson('/api/content/home', { data: noCardData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(!dom.includes('pov-right-col'), 'Entire Founder Card (pov-right-col) is removed when founderCardEnabled: false');

    // Step B: Enable card, disable founder photo
    const noPhotoData = JSON.parse(JSON.stringify(originalHome));
    noPhotoData.pov.founderCardEnabled = true;
    noPhotoData.pov.founderPhotoEnabled = false;
    await postJson('/api/content/home', { data: noPhotoData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(dom.includes('pov-right-col'), 'Founder Card is present');
    assert(!dom.includes('pov-portrait-frame'), 'Founder portrait photo is removed when founderPhotoEnabled: false');

    // Step C: Disable founder name
    const noNameData = JSON.parse(JSON.stringify(originalHome));
    noNameData.pov.founderNameEnabled = false;
    await postJson('/api/content/home', { data: noNameData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(!dom.includes('pov-founder-name'), 'Founder Name element is removed when founderNameEnabled: false');

    // Step D: Disable founder role badge
    const noRoleData = JSON.parse(JSON.stringify(originalHome));
    noRoleData.pov.founderRoleEnabled = false;
    await postJson('/api/content/home', { data: noRoleData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(!dom.includes('pov-founder-role'), 'Founder Role badge is removed when founderRoleEnabled: false');

    // Step E: Disable founder bio/description
    const noDescData = JSON.parse(JSON.stringify(originalHome));
    noDescData.pov.founderDescEnabled = false;
    await postJson('/api/content/home', { data: noDescData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(!dom.includes('pov-founder-desc'), 'Founder Bio/Description is removed when founderDescEnabled: false');

    // Step F: Disable founder button link (arrow)
    const noLinkData = JSON.parse(JSON.stringify(originalHome));
    noLinkData.pov.founderLinkEnabled = false;
    await postJson('/api/content/home', { data: noLinkData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(!dom.includes('pov-founder-action-btn'), 'Founder Button Link (Arrow) is removed when founderLinkEnabled: false');

    // Step G: Disable entire POV section
    const noPovData = JSON.parse(JSON.stringify(originalHome));
    noPovData.pov.enabled = false;
    noPovData.sections = noPovData.sections.map((s) => s.id === 'pov' ? { ...s, visible: false } : s);
    await postJson('/api/content/home', { data: noPovData, action: 'publish' });

    pageRes = await getHtml('/');
    dom = cleanDom(pageRes.html);
    assert(!dom.includes('positioning-philosophy'), 'Point of View section is completely removed when pov.enabled: false');

  } catch (err) {
    console.error('Fatal error during test run:', err);
    failed++;
  } finally {
    // Restore original home.json
    fs.writeFileSync(HOME_JSON_PATH, JSON.stringify(originalHome, null, 2), 'utf-8');
    if (fs.existsSync(DRAFT_JSON_PATH)) {
      try { fs.unlinkSync(DRAFT_JSON_PATH); } catch (e) {}
    }
    console.log('\n=== RESTORED ORIGINAL home.json ===');
  }

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
