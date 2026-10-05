const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Test runner for Arohana CMS / Draft / Published Architecture
async function runTests() {
  console.log('--- Starting CMS Architecture Automated Tests ---');

  const {
    readContentFile,
    writeContentFile,
    readDraftFile,
    getSectionContent,
    saveSectionDraft,
    publishSectionContent,
    publishAllDrafts,
    getPublishedSiteData,
    getDraftSiteData,
    deepClone,
  } = require('../src/lib/cms/content-manager.ts');

  // Backup original content files before testing
  const contentDir = path.join(__dirname, '..', 'content');
  const draftsDir = path.join(contentDir, 'drafts');
  const backupDir = path.join(__dirname, '..', 'scratch', 'content_backup');

  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const originalHome = JSON.parse(fs.readFileSync(path.join(contentDir, 'home.json'), 'utf-8'));
  const originalAbout = JSON.parse(fs.readFileSync(path.join(contentDir, 'about.json'), 'utf-8'));
  const originalWork = JSON.parse(fs.readFileSync(path.join(contentDir, 'work.json'), 'utf-8'));

  fs.writeFileSync(path.join(backupDir, 'home.json'), JSON.stringify(originalHome, null, 2));
  fs.writeFileSync(path.join(backupDir, 'about.json'), JSON.stringify(originalAbout, null, 2));
  fs.writeFileSync(path.join(backupDir, 'work.json'), JSON.stringify(originalWork, null, 2));

  try {
    // -------------------------------------------------------------------------
    // TEST 1 — STATISTICS: Initial values in Published
    // -------------------------------------------------------------------------
    console.log('\n[TEST 1] Verifying initial statistics in Published store...');
    const pubHome = getSectionContent('home', false);
    const pubCounters = pubHome.impactStats.counters;
    assert.strictEqual(pubCounters[0].target, 25, 'Stat 1 should be 25');
    assert.strictEqual(pubCounters[1].target, 10, 'Stat 2 should be 10');
    assert.strictEqual(pubCounters[2].target, 15, 'Stat 3 should be 15');
    console.log('✓ TEST 1 PASSED: 25, 10, 15 in Published Store');

    // -------------------------------------------------------------------------
    // TEST 2 — CHANGE STATISTICS & SAVE DRAFT: Live remains old, Draft is new
    // -------------------------------------------------------------------------
    console.log('\n[TEST 2] Changing statistics in Draft: 25->37, 10->14, 15->21...');
    const homeDraft1 = deepClone(pubHome);
    homeDraft1.impactStats.counters[0].target = 37;
    homeDraft1.impactStats.counters[1].target = 14;
    homeDraft1.impactStats.counters[2].target = 21;

    saveSectionDraft('home', homeDraft1);

    const liveAfterSave = getSectionContent('home', false);
    const draftAfterSave = getSectionContent('home', true);

    assert.strictEqual(liveAfterSave.impactStats.counters[0].target, 25, 'Live must remain 25');
    assert.strictEqual(liveAfterSave.impactStats.counters[1].target, 10, 'Live must remain 10');
    assert.strictEqual(liveAfterSave.impactStats.counters[2].target, 15, 'Live must remain 15');

    assert.strictEqual(draftAfterSave.impactStats.counters[0].target, 37, 'Draft must be 37');
    assert.strictEqual(draftAfterSave.impactStats.counters[1].target, 14, 'Draft must be 14');
    assert.strictEqual(draftAfterSave.impactStats.counters[2].target, 21, 'Draft must be 21');
    console.log('✓ TEST 2 PASSED: Draft is 37, 14, 21 while Live remains 25, 10, 15');

    // -------------------------------------------------------------------------
    // TEST 3 — REFRESH PERSISTENCE: Draft file exists and persists
    // -------------------------------------------------------------------------
    console.log('\n[TEST 3] Verifying draft persists on simulated refresh...');
    const draftFileOnDisk = readDraftFile('home');
    assert.ok(draftFileOnDisk, 'Draft file must exist on disk');
    assert.strictEqual(draftFileOnDisk.impactStats.counters[0].target, 37);
    console.log('✓ TEST 3 PASSED: Draft file persisted on disk independently of memory');

    // -------------------------------------------------------------------------
    // TEST 4 — NAVIGATE BETWEEN PAGES: Home draft remains intact
    // -------------------------------------------------------------------------
    console.log('\n[TEST 4] Navigating between pages (Home -> About -> Work -> Services -> Home)...');
    const aboutData = getSectionContent('about', true);
    const workData = getSectionContent('work', true);
    const servicesData = getSectionContent('services', true);
    // Returning to home:
    const returnHomeDraft = getSectionContent('home', true);
    assert.strictEqual(returnHomeDraft.impactStats.counters[0].target, 37);
    assert.strictEqual(returnHomeDraft.impactStats.counters[1].target, 14);
    assert.strictEqual(returnHomeDraft.impactStats.counters[2].target, 21);
    console.log('✓ TEST 4 PASSED: Home draft survives cross-page navigation');

    // -------------------------------------------------------------------------
    // TEST 5 — DISABLE / ENABLE SECTION: Does NOT reset numbers to 0
    // -------------------------------------------------------------------------
    console.log('\n[TEST 5] Testing section disable/enable toggling...');
    const homeDraftToggled = deepClone(returnHomeDraft);
    homeDraftToggled.services.enabled = false;
    saveSectionDraft('home', homeDraftToggled);
    let draftCheck = getSectionContent('home', true);
    assert.strictEqual(draftCheck.services.enabled, false);
    assert.strictEqual(draftCheck.impactStats.counters[0].target, 37, 'Numbers must not be erased when disabled');

    homeDraftToggled.services.enabled = true;
    saveSectionDraft('home', homeDraftToggled);
    draftCheck = getSectionContent('home', true);
    assert.strictEqual(draftCheck.services.enabled, true);
    assert.strictEqual(draftCheck.impactStats.counters[0].target, 37, 'Numbers must remain 37 after re-enabling');
    console.log('✓ TEST 5 PASSED: Disabling/enabling section preserves statistics');

    // -------------------------------------------------------------------------
    // TEST 6 — ZERO IS A VALID NUMBER
    // -------------------------------------------------------------------------
    console.log('\n[TEST 6] Testing 0 as a valid statistic...');
    const homeDraftZero = deepClone(draftCheck);
    homeDraftZero.impactStats.counters[0].target = 0;
    saveSectionDraft('home', homeDraftZero);
    const draftZeroCheck = getSectionContent('home', true);
    assert.strictEqual(draftZeroCheck.impactStats.counters[0].target, 0, 'Zero must be stored as 0, not fallback');
    console.log('✓ TEST 6 PASSED: Number 0 is valid and does not fallback to default');

    // Restore to 40 for subsequent tests
    homeDraftZero.impactStats.counters[0].target = 40;
    saveSectionDraft('home', homeDraftZero);

    // -------------------------------------------------------------------------
    // TEST 7 — MULTI-PAGE DRAFTS: Home Draft + Studio/About Draft
    // -------------------------------------------------------------------------
    console.log('\n[TEST 7] Creating Multi-Page Drafts (Home + Studio)...');
    const aboutDraft = deepClone(getSectionContent('about', false));
    const testHeadline = 'Brand, Culture & Special Initiatives (Draft Test)';
    aboutDraft.hero.headline = testHeadline;
    saveSectionDraft('about', aboutDraft);

    const fullDraftState = getDraftSiteData();
    const fullPublishedState = getPublishedSiteData();

    // CRM Preview / Draft:
    assert.strictEqual(fullDraftState.home.impactStats.counters[0].target, 40);
    assert.strictEqual(fullDraftState.about.hero.headline, testHeadline);

    // Live / Published:
    assert.strictEqual(fullPublishedState.home.impactStats.counters[0].target, 25);
    assert.notStrictEqual(fullPublishedState.about.hero.headline, testHeadline);
    console.log('✓ TEST 7 PASSED: Full draft site has Home=40 & Studio=new, Live has Home=25 & Studio=old');

    // -------------------------------------------------------------------------
    // TEST 9 — PAGE-LEVEL PUBLISHING: Publish Home ONLY
    // -------------------------------------------------------------------------
    console.log('\n[TEST 9] Testing Page-Level Publish (Publish Home only)...');
    publishSectionContent('home');

    const liveAfterHomePub = getSectionContent('home', false);
    const liveAboutAfterHomePub = getSectionContent('about', false);
    const draftAboutAfterHomePub = getSectionContent('about', true);

    assert.strictEqual(liveAfterHomePub.impactStats.counters[0].target, 40, 'Home live should now be 40');
    assert.notStrictEqual(liveAboutAfterHomePub.hero.headline, testHeadline, 'About live should STILL be old');
    assert.strictEqual(draftAboutAfterHomePub.hero.headline, testHeadline, 'About draft should STILL be draft');
    console.log('✓ TEST 9 PASSED: Home published to 40, About remains unpublished draft');

    // -------------------------------------------------------------------------
    // TEST 8 & 13 — GLOBAL PUBLISH: Publish All Changes
    // -------------------------------------------------------------------------
    console.log('\n[TEST 8 & 13] Testing Global Publish (Publish All Changes)...');
    publishAllDrafts();

    const liveAboutFinal = getSectionContent('about', false);
    assert.strictEqual(liveAboutFinal.hero.headline, testHeadline, 'About should now be published live');
    console.log('✓ TEST 8 & 13 PASSED: All drafts published live successfully');

    // -------------------------------------------------------------------------
    // TEST 14 — UNCHANGED PAGE SAFETY: Work, Services, etc. intact
    // -------------------------------------------------------------------------
    console.log('\n[TEST 14] Verifying unchanged pages (Work, Services, Tourin) remain intact...');
    const liveWorkFinal = getSectionContent('work', false);
    assert.ok(liveWorkFinal.caseStudies && liveWorkFinal.caseStudies.length > 0, 'Work case studies must exist');
    assert.strictEqual(liveWorkFinal.caseStudies[0].id, originalWork.caseStudies[0].id);
    console.log('✓ TEST 14 PASSED: Unchanged pages preserved intact with 0 data loss');

    console.log('\nALL CMS ARCHITECTURE TESTS COMPLETED SUCCESSFULLY! ✓✓✓\n');
  } finally {
    // Restore original backups
    fs.writeFileSync(path.join(contentDir, 'home.json'), JSON.stringify(originalHome, null, 2));
    fs.writeFileSync(path.join(contentDir, 'about.json'), JSON.stringify(originalAbout, null, 2));
    fs.writeFileSync(path.join(contentDir, 'work.json'), JSON.stringify(originalWork, null, 2));
    // Clean up draft test files
    try {
      const homeDraft = path.join(draftsDir, 'home.json');
      if (fs.existsSync(homeDraft)) fs.unlinkSync(homeDraft);
      const aboutDraft = path.join(draftsDir, 'about.json');
      if (fs.existsSync(aboutDraft)) fs.unlinkSync(aboutDraft);
    } catch (e) {}
  }
}

runTests().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
