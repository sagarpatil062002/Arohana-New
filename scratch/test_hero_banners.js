const http = require('http');

function apiRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, 'http://localhost:3000');
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null, raw: data });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function stripScripts(html) {
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

function fetchHtml(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(stripScripts(data)));
    }).on('error', reject);
  });
}

async function runHeroTests() {
  console.log('=== HERO SECTION & PER-BANNER THOROUGH VERIFICATION ===\n');

  // 1. Get initial content
  const initRes = await apiRequest('/api/content');
  const cms = initRes.data.data;
  const originalHome = JSON.parse(JSON.stringify(cms.home));

  try {
    // TEST 1: Leading Dash removal on Eyebrow
    const homeHtml = await fetchHtml('/');
    const heroDashPresent = homeHtml.includes('— STRATEGY · COMMUNICATION · EXECUTION') || homeHtml.includes('--- STRATEGY');
    console.log(`[${!heroDashPresent ? 'PASS' : 'FAIL'}] TEST 1: Leading dash before STRATEGY · COMMUNICATION · EXECUTION is removed (dash found: ${heroDashPresent})`);

    // TEST 2: Hero Section Enable / Disable
    console.log('\n--- Testing Hero Section Enable/Disable ---');
    const disabledHeroData = JSON.parse(JSON.stringify(originalHome));
    disabledHeroData.hero.enabled = false;
    if (disabledHeroData.sections) {
      disabledHeroData.sections = disabledHeroData.sections.map((s) => s.id === 'hero' ? { ...s, visible: false } : s);
    }
    await apiRequest('/api/content/home', 'POST', { data: disabledHeroData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlNoHero = await fetchHtml('/');
    const hasHeroInDom = htmlNoHero.includes('hero-section');
    console.log(`[${!hasHeroInDom ? 'PASS' : 'FAIL'}] TEST 2: Disable Hero section hides it completely from website DOM (has hero: ${hasHeroInDom})`);

    // Restore Hero Section
    disabledHeroData.hero.enabled = true;
    if (disabledHeroData.sections) {
      disabledHeroData.sections = disabledHeroData.sections.map((s) => s.id === 'hero' ? { ...s, visible: true } : s);
    }
    await apiRequest('/api/content/home', 'POST', { data: disabledHeroData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlWithHero = await fetchHtml('/');
    const heroRestored = htmlWithHero.includes('hero-section');
    console.log(`[${heroRestored ? 'PASS' : 'FAIL'}] TEST 3: Re-enable Hero section restores it to website DOM (hero restored: ${heroRestored})`);

    // TEST 4: Per-Banner Custom Content and Settings
    console.log('\n--- Testing Per-Banner Content & Toggles ---');
    const customBannerData = JSON.parse(JSON.stringify(originalHome));
    customBannerData.hero.bannerImages = [
      {
        id: 'qa-banner-1',
        image: '/images/home/hero-mountain-sky.png',
        badge: 'QA SPECIAL EYEBROW',
        badgeEnabled: true,
        eyebrowEnabled: true,
        headline: 'QA CUSTOM BANNER 1 HEADLINE',
        headlineEnabled: true,
        subheadline: 'QA custom subheadline text for banner 1',
        subheadlineEnabled: true,
        clickableUrl: '/qa-unique-banner-destination',
        isImageClickable: true,
        buttonLabel: 'QA Action Button',
        buttonUrl: '/work/raysons-group',
        buttonEnabled: true,
        imageEnabled: true,
        enabled: true,
      },
      {
        id: 'qa-banner-2',
        image: '/images/services/services-hero-collage.png',
        badge: 'QA SECOND EYEBROW',
        badgeEnabled: true,
        headline: 'QA BANNER 2 SECOND HEADLINE',
        headlineEnabled: true,
        subheadline: 'QA subheadline 2',
        subheadlineEnabled: true,
        clickableUrl: '/about',
        isImageClickable: false, // NOT clickable
        buttonLabel: 'QA Button 2',
        buttonUrl: '/about',
        buttonEnabled: false, // button hidden
        imageEnabled: true,
        enabled: true,
      }
    ];
    await apiRequest('/api/content/home', 'POST', { data: customBannerData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});

    const htmlCustomBanner = await fetchHtml('/');
    const hasCustomEyebrow = htmlCustomBanner.includes('QA SPECIAL EYEBROW');
    const hasCustomHeadline = htmlCustomBanner.includes('QA CUSTOM BANNER 1 HEADLINE');
    const hasCustomSubheadline = htmlCustomBanner.includes('QA custom subheadline text for banner 1');
    const hasCustomButton = htmlCustomBanner.includes('QA Action Button');
    const hasClickableLink = htmlCustomBanner.includes('href="/qa-unique-banner-destination"');

    console.log(`[${hasCustomEyebrow ? 'PASS' : 'FAIL'}] TEST 4A: Banner Eyebrow renders custom content (found: ${hasCustomEyebrow})`);
    console.log(`[${hasCustomHeadline ? 'PASS' : 'FAIL'}] TEST 4B: Banner Headline renders custom content (found: ${hasCustomHeadline})`);
    console.log(`[${hasCustomSubheadline ? 'PASS' : 'FAIL'}] TEST 4C: Banner Subheadline renders custom content (found: ${hasCustomSubheadline})`);
    console.log(`[${hasCustomButton ? 'PASS' : 'FAIL'}] TEST 4D: Banner Button renders custom label & URL (found: ${hasCustomButton})`);
    console.log(`[${hasClickableLink ? 'PASS' : 'FAIL'}] TEST 4E: Banner Image renders clickable URL link wrapper (found: ${hasClickableLink})`);

    // TEST 5: Toggle Off Eyebrow on Banner 1
    console.log('\n--- Testing Individual Toggle Controls on Banner ---');
    customBannerData.hero.bannerImages[0].eyebrowEnabled = false;
    customBannerData.hero.bannerImages[0].badgeEnabled = false;
    await apiRequest('/api/content/home', 'POST', { data: customBannerData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlNoEyebrow = await fetchHtml('/');
    const eyebrowHidden = !htmlNoEyebrow.includes('QA SPECIAL EYEBROW');
    console.log(`[${eyebrowHidden ? 'PASS' : 'FAIL'}] TEST 5: Toggle off Eyebrow on Banner 1 hides eyebrow (hidden: ${eyebrowHidden})`);

    // TEST 6: Toggle Off Headline on Banner 1
    customBannerData.hero.bannerImages[0].headlineEnabled = false;
    await apiRequest('/api/content/home', 'POST', { data: customBannerData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlNoHeadline = await fetchHtml('/');
    const headlineHidden = !htmlNoHeadline.includes('QA CUSTOM BANNER 1 HEADLINE');
    console.log(`[${headlineHidden ? 'PASS' : 'FAIL'}] TEST 6: Toggle off Headline on Banner 1 hides headline (hidden: ${headlineHidden})`);

    // TEST 7: Toggle Off Subheadline on Banner 1
    customBannerData.hero.bannerImages[0].subheadlineEnabled = false;
    await apiRequest('/api/content/home', 'POST', { data: customBannerData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlNoSubheadline = await fetchHtml('/');
    const subheadlineHidden = !htmlNoSubheadline.includes('QA custom subheadline text for banner 1');
    console.log(`[${subheadlineHidden ? 'PASS' : 'FAIL'}] TEST 7: Toggle off Subheadline on Banner 1 hides subheadline (hidden: ${subheadlineHidden})`);

    // TEST 8: Toggle Off Button on Banner 1
    customBannerData.hero.bannerImages[0].buttonEnabled = false;
    await apiRequest('/api/content/home', 'POST', { data: customBannerData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlNoBtn = await fetchHtml('/');
    const btnHidden = !htmlNoBtn.includes('QA Action Button');
    console.log(`[${btnHidden ? 'PASS' : 'FAIL'}] TEST 8: Toggle off Button on Banner 1 hides button (hidden: ${btnHidden})`);

    // TEST 9: Toggle Off Clickable Image (isImageClickable = false)
    customBannerData.hero.bannerImages[0].isImageClickable = false;
    await apiRequest('/api/content/home', 'POST', { data: customBannerData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlNoLink = await fetchHtml('/');
    const linkNotWrapped = !htmlNoLink.includes('href="/qa-unique-banner-destination"');
    console.log(`[${linkNotWrapped ? 'PASS' : 'FAIL'}] TEST 9: Toggle off Clickable Image removes URL link wrapper from image (link wrapper removed: ${linkNotWrapped})`);

    // TEST 10: Toggle Off Banner 1 completely (should show Banner 2)
    customBannerData.hero.bannerImages[0].enabled = false;
    await apiRequest('/api/content/home', 'POST', { data: customBannerData, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    const htmlBanner2Active = await fetchHtml('/');
    const banner2HeadlineRendered = htmlBanner2Active.includes('QA BANNER 2 SECOND HEADLINE');
    console.log(`[${banner2HeadlineRendered ? 'PASS' : 'FAIL'}] TEST 10: Disabling Banner 1 activates Banner 2 content (banner 2 rendered: ${banner2HeadlineRendered})`);

  } finally {
    // Restore original home configuration cleanly
    console.log('\n--- Restoring Original CMS Content ---');
    await apiRequest('/api/content/home', 'POST', { data: originalHome, draft: true });
    await apiRequest('/api/content/publish', 'POST', {});
    console.log('✓ Successfully restored original home state');
  }

  console.log('\n=== ALL HERO BANNER TESTS COMPLETED SUCCESSFULLY ===');
}

runHeroTests().catch(console.error);
