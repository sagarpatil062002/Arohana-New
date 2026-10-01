const http = require('http');

function apiGet(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on('error', reject);
  });
}

function apiPost(path, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = http.request(`http://localhost:3000${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data), raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function fetchHtml(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function runQA() {
  console.log('=== STARTING FULL END-TO-END QA SUITE ===\n');
  const results = [];

  function record(id, category, name, passed, details) {
    results.push({ id, category, name, passed, details });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${id}: ${name} - ${details}`);
  }

  // 1. Fetch current CMS state
  const initialContentRes = await apiGet('/api/content');
  if (initialContentRes.status !== 200 || !initialContentRes.data?.data) {
    console.error('Failed to load CMS content endpoint');
    return;
  }
  const originalCms = initialContentRes.data.data;
  console.log('✓ Successfully retrieved initial CMS state\n');

  // --- TEST 1: HOME HERO DASH REMOVAL ---
  const homeHtml = (await fetchHtml('/')).html;
  const hasOldHeroDash = homeHtml.includes('— STRATEGY · COMMUNICATION · EXECUTION') || homeHtml.includes('— STRATEGY');
  record(
    'TC-HOME-01',
    'Home Page',
    'Hero dash removal',
    !hasOldHeroDash && (homeHtml.includes('STRATEGY · COMMUNICATION · EXECUTION') || homeHtml.includes('STRATEGY')),
    hasOldHeroDash ? 'Old leading dash found in hero!' : 'Dash cleanly removed; clean tag present'
  );

  // --- TEST 2: HOME POV BUTTONS REMOVAL ---
  // Verify rendered HTML body does not have the buttons in interactive button markup
  const povSectionMatch = homeHtml.match(/<section[^>]*id="positioning-philosophy"[^>]*>([\s\S]*?)<\/section>/);
  const povHtml = povSectionMatch ? povSectionMatch[1] : homeHtml;
  const hasPovButton1 = povHtml.includes('Read Founder Story &amp; Philosophy') || povHtml.includes('Read Founder Story & Philosophy');
  const hasPovButton2 = povHtml.includes('Explore Practice Areas');
  record(
    'TC-HOME-02',
    'Home Page',
    'POV buttons removed from website',
    !hasPovButton1 && !hasPovButton2,
    (!hasPovButton1 && !hasPovButton2) ? 'Both buttons completely absent from DOM' : `Button 1: ${hasPovButton1}, Button 2: ${hasPovButton2}`
  );

  // --- TEST 3: HOME WORK PROOF DASH & SUBTITLE REMOVAL ---
  const hasWorkProofDash = homeHtml.includes('— WORK PROOF') || homeHtml.includes('&mdash; WORK PROOF');
  const hasWorkProofOldSubtitle = homeHtml.includes('A selection of brand stories and projects that show how Ārohana thinks');
  record(
    'TC-HOME-03',
    'Home Page',
    'Work Proof red dash & subtitle removal',
    !hasWorkProofDash && !hasWorkProofOldSubtitle,
    `Work proof dash present: ${hasWorkProofDash}, subtitle present: ${hasWorkProofOldSubtitle}`
  );

  // --- TEST 4: HOME 3 STATISTICS ---
  const originalStats = originalCms.home?.impactStats?.counters || [];
  record(
    'TC-HOME-04',
    'Home Page',
    'Statistics section count is exactly 3',
    originalStats.length === 3,
    `Configured statistics count: ${originalStats.length} (Expected 3)`
  );

  // --- TEST 5: HOME BRANDING & COMMUNICATION DASH REMOVAL ---
  const hasBrandingDash = homeHtml.includes('BRANDING &amp; COMMUNICATION —') || homeHtml.includes('BRANDING & COMMUNICATION —') || homeHtml.includes('BRANDING &amp; COMMUNICATION -');
  record(
    'TC-HOME-05',
    'Home Page',
    'Branding & Communication dash removal',
    !hasBrandingDash && (homeHtml.includes('BRANDING &amp; COMMUNICATION') || homeHtml.includes('BRANDING & COMMUNICATION')),
    `Dash after BRANDING & COMMUNICATION present: ${hasBrandingDash}`
  );

  // --- TEST 6: STUDIO PAGE DASH & LOCATION REMOVAL ---
  const studioHtml = (await fetchHtml('/about')).html;
  const hasAboutDash = studioHtml.includes('— ABOUT ĀROHANA') || studioHtml.includes('&mdash; ABOUT ĀROHANA');
  const hasCtaLocation = studioHtml.includes('KOLHAPUR · PUNE · LADAKH');
  record(
    'TC-STUDIO-01',
    'Studio Page',
    'Studio hero dash & CTA location removal',
    !hasAboutDash && !hasCtaLocation,
    `Hero dash present: ${hasAboutDash}, CTA location present: ${hasCtaLocation}`
  );

  // --- TEST 7: PARITY EDIT TEST (HOME HERO HEADLINE) ---
  console.log('\n--- EXECUTING EDIT TEST ON HERO HEADLINE ---');
  const originalHeadline = originalCms.home?.hero?.banners?.[0]?.headline || originalCms.home?.hero?.mainHeadline;
  const testHeadlineVal = 'QA TEST HEADLINE - DO NOT KEEP';
  
  // Clone and modify draft
  const testHomeData = JSON.parse(JSON.stringify(originalCms.home));
  if (testHomeData.hero?.banners?.[0]) {
    testHomeData.hero.banners[0].headline = testHeadlineVal;
  }
  testHomeData.hero.mainHeadline = testHeadlineVal;
  
  // Save draft
  await apiPost('/api/content/home', { data: testHomeData, draft: true });
  // Publish
  await apiPost('/api/content/publish', {});
  
  // Verify on website
  const editedHomeHtml = (await fetchHtml('/')).html;
  const headlineUpdated = editedHomeHtml.includes(testHeadlineVal);
  record(
    'TC-PARITY-01',
    'Parity & Persistence',
    'Hero headline edit reflect on website',
    headlineUpdated,
    headlineUpdated ? `Successfully matched '${testHeadlineVal}' on website` : 'Edit did not reflect on website'
  );

  // Restore original
  if (testHomeData.hero?.banners?.[0]) {
    testHomeData.hero.banners[0].headline = originalHeadline;
  }
  testHomeData.hero.mainHeadline = originalHeadline;
  await apiPost('/api/content/home', { data: testHomeData, draft: true });
  await apiPost('/api/content/publish', {});

  // Verify restoration
  const restoredHomeHtml = (await fetchHtml('/')).html;
  record(
    'TC-PARITY-02',
    'Parity & Persistence',
    'Hero headline restored to original',
    restoredHomeHtml.includes(originalHeadline) && !restoredHomeHtml.includes(testHeadlineVal),
    'Original hero headline restored cleanly'
  );

  // --- TEST 8: ENABLE/DISABLE TEST (STATISTIC 1) ---
  console.log('\n--- EXECUTING ENABLE/DISABLE TEST ON STATISTIC 1 ---');
  const disabledStatsHomeData = JSON.parse(JSON.stringify(originalCms.home));
  const stat1Title = disabledStatsHomeData.impactStats.counters[0].title;
  disabledStatsHomeData.impactStats.counters[0].enabled = false;
  
  await apiPost('/api/content/home', { data: disabledStatsHomeData, draft: true });
  await apiPost('/api/content/publish', {});
  
  const stat1Pattern = new RegExp(`sharp-stat-label[^>]*>\\s*${stat1Title}\\s*<\\/div>`);
  const disabledStatHtml = (await fetchHtml('/')).html;
  const stat1LabelRendered = stat1Pattern.test(disabledStatHtml);
  record(
    'TC-VISIBILITY-01',
    'Visibility Control',
    'Disable Statistic 1 hides it from website',
    !stat1LabelRendered,
    !stat1LabelRendered ? `Stat 1 label '${stat1Title}' is hidden from rendered DOM` : `Stat 1 label still rendered`
  );

  // Re-enable Stat 1
  disabledStatsHomeData.impactStats.counters[0].enabled = true;
  await apiPost('/api/content/home', { data: disabledStatsHomeData, draft: true });
  await apiPost('/api/content/publish', {});
  
  const reenabledStatHtml = (await fetchHtml('/')).html;
  const stat1Restored = stat1Pattern.test(reenabledStatHtml);
  record(
    'TC-VISIBILITY-02',
    'Visibility Control',
    'Re-enable Statistic 1 restores it to website',
    stat1Restored,
    stat1Restored ? `Stat 1 label '${stat1Title}' restored to website` : 'Stat 1 label failed to re-render'
  );

  // --- TEST 9: STUDIO TEAM MEMBER ORDERING ---
  console.log('\n--- EXECUTING STUDIO TEAM MEMBER ORDERING TEST ---');
  const originalAbout = JSON.parse(JSON.stringify(originalCms.about));
  const members = originalAbout.team?.members || [];
  if (members.length >= 3) {
    const member0Name = members[0].name;
    const member2Name = members[2].name;
    
    // Reorder: 2, 0, 1
    const reorderedMembers = [members[2], members[0], members[1], ...members.slice(3)];
    const reorderedAbout = { ...originalAbout, team: { ...originalAbout.team, members: reorderedMembers } };
    
    await apiPost('/api/content/about', { data: reorderedAbout, draft: true });
    await apiPost('/api/content/publish', {});
    
    const reorderedHtml = (await fetchHtml('/about')).html;
    const pos0 = reorderedHtml.indexOf(member2Name);
    const pos1 = reorderedHtml.indexOf(member0Name);
    const orderCorrect = pos0 !== -1 && pos1 !== -1 && pos0 < pos1;
    
    record(
      'TC-STUDIO-02',
      'Studio Page',
      'Team member sequence reordering',
      orderCorrect,
      orderCorrect ? `Member '${member2Name}' appears before '${member0Name}'` : 'Sequence did not update in rendered DOM'
    );

    // Restore original team order
    await apiPost('/api/content/about', { data: originalAbout, draft: true });
    await apiPost('/api/content/publish', {});
  }

  // --- TEST 10: CASE STUDY 3 LAYOUTS VERIFICATION ---
  console.log('\n--- EXECUTING CASE STUDY 3-LAYOUT TEST ---');
  const workRes = await apiGet('/api/content/work');
  const originalWork = workRes.data?.data || originalCms.work;
  const targetCaseSlug = 'raysons-group';
  
  let updatedWork = JSON.parse(JSON.stringify(originalWork));
  let caseObj = updatedWork.caseStudies.find(c => c.slug === targetCaseSlug || c.id === targetCaseSlug);
  if (caseObj) {
    // Test Layout 1
    caseObj.layoutStyle = 'layout-1';
    await apiPost('/api/content/work', { data: updatedWork, draft: true });
    await apiPost('/api/content/publish', {});
    let l1Html = (await fetchHtml(`/work/${targetCaseSlug}`)).html;
    record('TC-LAYOUT-01', 'Case Studies', 'Layout 1 rendered', l1Html.includes('layout-1-editorial'), 'Layout 1 class applied');

    // Test Layout 2
    caseObj.layoutStyle = 'layout-2';
    await apiPost('/api/content/work', { data: updatedWork, draft: true });
    await apiPost('/api/content/publish', {});
    let l2Html = (await fetchHtml(`/work/${targetCaseSlug}`)).html;
    record('TC-LAYOUT-02', 'Case Studies', 'Layout 2 rendered', l2Html.includes('layout-2-split'), 'Layout 2 class applied');

    // Test Layout 3
    caseObj.layoutStyle = 'layout-3';
    await apiPost('/api/content/work', { data: updatedWork, draft: true });
    await apiPost('/api/content/publish', {});
    let l3Html = (await fetchHtml(`/work/${targetCaseSlug}`)).html;
    record('TC-LAYOUT-03', 'Case Studies', 'Layout 3 rendered', l3Html.includes('layout-3-magazine'), 'Layout 3 class applied');

    // Restore Layout 1
    caseObj.layoutStyle = 'layout-1';
    await apiPost('/api/content/work', { data: updatedWork, draft: true });
    await apiPost('/api/content/publish', {});
  }

  // --- TEST 11: CORE SCOPE ENABLE/DISABLE ---
  console.log('\n--- EXECUTING CORE SCOPE ENABLE/DISABLE TEST ---');
  if (caseObj) {
    // Disable Core Scope
    caseObj.showCoreScope = false;
    await apiPost('/api/content/work', { data: updatedWork, draft: true });
    await apiPost('/api/content/publish', {});
    
    let disabledScopeHtml = (await fetchHtml(`/work/${targetCaseSlug}`)).html;
    const scopeHidden = !disabledScopeHtml.includes('CORE SCOPE');
    record(
      'TC-SCOPE-01',
      'Case Studies',
      'Core Scope disabled hides section completely',
      scopeHidden,
      scopeHidden ? 'CORE SCOPE not present on case study page' : 'CORE SCOPE still rendered when disabled'
    );

    // Re-enable Core Scope
    caseObj.showCoreScope = true;
    await apiPost('/api/content/work', { data: updatedWork, draft: true });
    await apiPost('/api/content/publish', {});
    
    let enabledScopeHtml = (await fetchHtml(`/work/${targetCaseSlug}`)).html;
    const scopeRestored = enabledScopeHtml.includes('CORE SCOPE');
    record(
      'TC-SCOPE-02',
      'Case Studies',
      'Core Scope re-enabled restores section',
      scopeRestored,
      scopeRestored ? 'CORE SCOPE rendered on case study page' : 'CORE SCOPE failed to re-appear'
    );
  }

  // --- TEST 12: NEW PROJECT CREATION IN ARMY PROJECTS ---
  console.log('\n--- EXECUTING NEW PROJECT CREATION TEST ---');
  const armyRes = await apiGet('/api/content/army-projects');
  const originalArmy = armyRes.data?.data || originalCms['army-projects'];
  
  const testProjectId = `qa-test-${Date.now()}`;
  const testProject = {
    id: testProjectId,
    num: '99',
    command: 'QA TEST COMMAND',
    location: 'QA TEST LOCATION',
    title: 'QA TEST PROJECT',
    date: 'QA TEST DATE',
    category: 'QA CUSTOM CATEGORY',
    subtitle: 'QA TEST SUBTITLE',
    description: 'QA TEST DESCRIPTION',
    videoUrl: '',
    image: '/images/army/army-hero.jpg',
    published: true,
  };
  
  const updatedArmy = JSON.parse(JSON.stringify(originalArmy));
  updatedArmy.projects.push(testProject);
  
  await apiPost('/api/content/army-projects', { data: updatedArmy, draft: true });
  await apiPost('/api/content/publish', {});
  
  const armyPageHtml = (await fetchHtml('/indian-army-projects')).html;
  const projectCreated =
    armyPageHtml.includes('QA TEST PROJECT') &&
    armyPageHtml.includes('QA TEST COMMAND') &&
    armyPageHtml.includes('QA TEST LOCATION') &&
    armyPageHtml.includes('QA CUSTOM CATEGORY');
    
  record(
    'TC-PROJ-01',
    'Project Creation',
    'New project fields rendered on website',
    projectCreated,
    projectCreated ? 'All test fields accurately displayed on website' : 'Some project fields missing from website'
  );

  // Disable test project
  testProject.published = false;
  updatedArmy.projects = updatedArmy.projects.map(p => p.id === testProjectId ? testProject : p);
  await apiPost('/api/content/army-projects', { data: updatedArmy, draft: true });
  await apiPost('/api/content/publish', {});
  
  const disabledArmyHtml = (await fetchHtml('/indian-army-projects')).html;
  const projectCardRendered = disabledArmyHtml.includes('<h2 class="card-title" style="white-space:pre-line">QA TEST PROJECT</h2>') ||
    disabledArmyHtml.includes('class="card-title">QA TEST PROJECT</h2>');
  record(
    'TC-PROJ-02',
    'Project Creation',
    'Disable project hides it from website',
    !projectCardRendered,
    !projectCardRendered ? 'Project card is omitted from rendered DOM' : 'Project card still rendered'
  );

  // Clean up test project
  updatedArmy.projects = updatedArmy.projects.filter(p => p.id !== testProjectId);
  await apiPost('/api/content/army-projects', { data: updatedArmy, draft: true });
  await apiPost('/api/content/publish', {});

  // --- TEST 13: REMOVED PROJECT FIELDS AUDIT ---
  console.log('\n--- AUDITING REMOVED FIELDS (SCOPE, APPROACH, DISCIPLINE) ---');
  const cleanedArmyPageHtml = (await fetchHtml('/indian-army-projects')).html;
  const hasScopeField = cleanedArmyPageHtml.includes('SCOPE OF WORK');
  const hasApproachField = cleanedArmyPageHtml.includes('CREATIVE APPROACH');
  const hasDisciplineField = cleanedArmyPageHtml.includes('PRODUCTION DISCIPLINE');
  record(
    'TC-PROJ-03',
    'Project Fields',
    'Removed legacy fields absent from website',
    !hasScopeField && !hasApproachField && !hasDisciplineField,
    `Scope: ${hasScopeField}, Approach: ${hasApproachField}, Discipline: ${hasDisciplineField}`
  );

  // --- TEST 14: REZANG LA 1 LANDSCAPE IMAGE ---
  console.log('\n--- CHECKING REZANG LA LANDSCAPE IMAGE ---');
  const rezangLaProj = originalArmy.projects?.find(p => p.id === 'rezang-la-memorial');
  const hasLandscapeImg = Boolean(rezangLaProj?.landscapeImage);
  const rezangLaInDom = cleanedArmyPageHtml.includes(rezangLaProj?.landscapeImage || 'rezang-la');
  record(
    'TC-REZANG-01',
    'Rezang La Memorial',
    'Single landscape image configured & displayed',
    hasLandscapeImg && rezangLaInDom,
    `Landscape image: ${rezangLaProj?.landscapeImage}, in DOM: ${rezangLaInDom}`
  );

  // --- TEST 15: FIREFURY CORPS CAROUSEL ---
  console.log('\n--- CHECKING FIREFURY CORPS CAROUSEL ---');
  const firefuryProj = originalArmy.projects?.find(p => p.id === 'corps-publications');
  const carouselImgCount = firefuryProj?.carouselImages?.length || 0;
  record(
    'TC-FIREFURY-01',
    'Firefury Corps',
    'Carousel image limits (min 2, max 5)',
    carouselImgCount >= 2 && carouselImgCount <= 5,
    `Configured carousel image count: ${carouselImgCount}`
  );

  // --- TEST 16: WORK PAGE AUTO-SCROLL PERSISTENCE ---
  const workHtml = (await fetchHtml('/work')).html;
  const hasReelsCarousel = workHtml.includes('reels-track') || workHtml.includes('reels') || workHtml.includes('work-reels');
  record(
    'TC-AUTOSCROLL-01',
    'Work Page',
    'AutoScroll component markup and script initialized',
    hasReelsCarousel,
    'Reels track container rendered in DOM'
  );

  // --- TEST 17: WORK COMMUNICATION & PRODUCTION 3 CARDS ---
  const commsProj = originalArmy.projects?.find(p => p.id === '14-corps-communication');
  const cardsCount = commsProj?.interactiveCards?.length || 0;
  record(
    'TC-COMMS-01',
    'Communication & Production',
    '3 interactive cards configured',
    cardsCount === 3,
    `Card count: ${cardsCount}`
  );

  console.log('\n=== TEST SUITE COMPLETED ===');
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  console.log(`Summary: Total ${results.length} | Passed: ${passedCount} | Failed: ${failedCount}`);

  // Write full results to JSON file
  const fs = require('fs');
  fs.writeFileSync('scratch/qa_results.json', JSON.stringify({ results, summary: { total: results.length, passed: passedCount, failed: failedCount } }, null, 2));
}

runQA().catch(console.error);
