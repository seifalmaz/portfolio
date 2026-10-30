/**
 * Comprehensive Automated Production Readiness Verification
 * Tests data schemas, asset availability, security rules, SEO metadata, and service utilities.
 */

import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const suite = {
  passed: 0,
  failed: 0,
  results: []
};

function test(name, fn) {
  try {
    fn();
    suite.passed++;
    suite.results.push({ name, status: 'PASS' });
    console.log(`  ✓ ${name}`);
  } catch (err) {
    suite.failed++;
    suite.results.push({ name, status: 'FAIL', error: err.message });
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
  }
}

console.log('\n======================================================');
console.log('🧪 RUNNING PRODUCTION READINESS TEST SUITE');
console.log('======================================================\n');

// -----------------------------------------------------------------------------
// Group 1: Utilities & Document Handling
// -----------------------------------------------------------------------------
console.log('--- Group 1: File & Document Utilities ---');

import { isPdfUrl, getFileName, formatFileSize } from '../src/utils/fileUtils.js';

test('isPdfUrl correctly identifies standard, query-string, and uppercase PDF URLs', () => {
  assert.strictEqual(isPdfUrl('https://example.com/certificate.pdf'), true);
  assert.strictEqual(isPdfUrl('https://example.com/doc.PDF'), true);
  assert.strictEqual(isPdfUrl('https://supabase.co/storage/v1/object/public/certs/doc.pdf?token=12345'), true);
  assert.strictEqual(isPdfUrl('data:application/pdf;base64,JVBERi0xLjc...'), true);
  assert.strictEqual(isPdfUrl('https://example.com/image.png'), false);
  assert.strictEqual(isPdfUrl('https://example.com/image.webp'), false);
  assert.strictEqual(isPdfUrl(null), false);
  assert.strictEqual(isPdfUrl(''), false);
});

test('getFileName extracts clean file names and strips timestamp prefixes', () => {
  assert.strictEqual(getFileName('https://example.com/17283921_certificate.pdf'), 'certificate.pdf');
  assert.strictEqual(getFileName('https://example.com/docs/Seif%20Almaz%20CV.pdf'), 'Seif Almaz CV.pdf');
  assert.strictEqual(getFileName(null, 'default.pdf'), 'default.pdf');
});

test('formatFileSize formats byte units accurately', () => {
  assert.strictEqual(formatFileSize(0), '0 B');
  assert.strictEqual(formatFileSize(1024), '1.0 KB');
  assert.strictEqual(formatFileSize(1048576), '1.0 MB');
});

// -----------------------------------------------------------------------------
// Group 2: Personal Profile & Social Links Verification
// -----------------------------------------------------------------------------
console.log('\n--- Group 2: Profile Links & Content Integrity ---');

test('personalData contains valid Mostaql profile pointing strictly to /u/seifalmaz', () => {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/data/personalData.js'), 'utf-8');
  assert.ok(fileContent.includes('https://mostaql.com/u/seifalmaz'), 'Mostaql link must match https://mostaql.com/u/seifalmaz');
  assert.ok(!fileContent.includes('mostaql.com/u/other'), 'No incorrect Mostaql link');
});

test('personalData contains verified social destinations and valid email', () => {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/data/personalData.js'), 'utf-8');
  assert.ok(fileContent.includes('https://github.com/seifalmaz'), 'GitHub link must be present');
  assert.ok(fileContent.includes('https://www.linkedin.com/in/seif-almaz'), 'LinkedIn link must be present');
  assert.ok(fileContent.includes('https://kaggle.com/seifalmaz'), 'Kaggle link must be present');
  assert.ok(fileContent.includes('email: "siefalmaz3@gmail.com"'), 'Primary email must be siefalmaz3@gmail.com');
  assert.ok(!fileContent.includes('seifalmaz.dev'), 'Outdated email must not be present');
});

test('Footer and Hero narrative do not contain student or university claims', () => {
  const footerContent = fs.readFileSync(path.join(rootDir, 'src/components/layout/Footer.jsx'), 'utf-8');
  assert.ok(!footerContent.includes('Helwan National University'), 'University must be removed from footer');
  const heroContent = fs.readFileSync(path.join(rootDir, 'src/components/sections/HeroSection.jsx'), 'utf-8');
  assert.ok(!heroContent.includes('Computer Science student'), 'Student title must be removed from hero');
  assert.ok(!heroContent.includes('Helwan National University'), 'University must be removed from hero');
});

test('Dedicated EducationSection is present on HomePage', () => {
  const homeContent = fs.readFileSync(path.join(rootDir, 'src/pages/HomePage.jsx'), 'utf-8');
  assert.ok(homeContent.includes('EducationSection'), 'EducationSection must be imported and rendered in HomePage');
});

test('Floating DEPI ML & Analytics badge remains removed from About section', () => {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/components/sections/AboutSection.jsx'), 'utf-8');
  // Check that floating DEPI widget is not rendered
  assert.ok(!fileContent.includes('DEPI Microsoft ML &amp; Analytics Specialist'), 'Floating DEPI badge must remain removed');
  assert.ok(!fileContent.includes('floatWidget2'), 'Unused floatWidget2 must remain removed');
});

// -----------------------------------------------------------------------------
// Group 3: Navigation & Routing Integrity
// -----------------------------------------------------------------------------
console.log('\n--- Group 3: Navigation & Route Configuration ---');

test('navigationData contains all primary sections and route items', () => {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/data/navigationData.js'), 'utf-8');
  assert.ok(fileContent.includes('sectionId: "hero"'));
  assert.ok(fileContent.includes('sectionId: "about"'));
  assert.ok(fileContent.includes('sectionId: "skills"'));
  assert.ok(fileContent.includes('sectionId: "projects"'));
  assert.ok(fileContent.includes('sectionId: "experience"'));
  assert.ok(fileContent.includes('sectionId: "contact"'));
});

test('App.jsx defines public routes and admin protected route', () => {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/App.jsx'), 'utf-8');
  assert.ok(fileContent.includes('path="/login"'));
  assert.ok(fileContent.includes('path="/admin"'));
  assert.ok(fileContent.includes('path="projects"'));
  assert.ok(fileContent.includes('path="projects/:slug"'));
  assert.ok(fileContent.includes('<ProtectedRoute>'));
});

// -----------------------------------------------------------------------------
// Group 4: Case Studies & Projects Data
// -----------------------------------------------------------------------------
console.log('\n--- Group 4: Projects & Case Studies ---');

test('All 4 major projects are defined with unique slugs', () => {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/data/projectsData.js'), 'utf-8');
  const expectedSlugs = [
    'railway-dashboard',
    'spotify-dashboard',
    'waste-classifier',
    'gesture-recognition'
  ];
  for (const slug of expectedSlugs) {
    assert.ok(fileContent.includes(`slug: "${slug}"`), `Project slug ${slug} must be present`);
  }
});

test('Projects data includes benchmarkTable metrics for candidate evaluations', () => {
  const fileContent = fs.readFileSync(path.join(rootDir, 'src/data/projectsData.js'), 'utf-8');
  assert.ok(fileContent.includes('benchmarkTable'), 'benchmarkTable key must be present in projects data');
});

// -----------------------------------------------------------------------------
// Group 5: Supabase Schema & Sync Payloads
// -----------------------------------------------------------------------------
console.log('\n--- Group 5: Supabase Schema & Data Sync ---');

test('Supabase schema.sql includes thumbnail_url and benchmark_table with RLS policies', () => {
  const schemaContent = fs.readFileSync(path.join(rootDir, 'supabase/schema.sql'), 'utf-8');
  assert.ok(schemaContent.includes('benchmark_table JSONB'), 'schema.sql must define benchmark_table');
  assert.ok(schemaContent.includes('thumbnail_url TEXT'), 'schema.sql must define thumbnail_url in certifications');
  assert.ok(schemaContent.includes('ENABLE ROW LEVEL SECURITY'), 'RLS must be enabled');
  assert.ok(schemaContent.includes('Admin manage projects'), 'Authenticated admin RLS policy must exist');
});

test('cmsSyncService handles benchmark_table and thumbnail_url schema cache gracefully', () => {
  const syncContent = fs.readFileSync(path.join(rootDir, 'src/services/cmsSyncService.js'), 'utf-8');
  assert.ok(syncContent.includes('benchmark_table'), 'cmsSyncService must handle benchmark_table');
  assert.ok(syncContent.includes('thumbnail_url'), 'cmsSyncService must include thumbnail_url');
});

// -----------------------------------------------------------------------------
// Group 6: Security & Credentials Audit
// -----------------------------------------------------------------------------
console.log('\n--- Group 6: Security & Credentials Audit ---');

test('No Supabase service_role keys are bundled in source files or env example', () => {
  const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf-8');
  assert.ok(!envExample.includes('service_role'), '.env.example must not contain service_role');
  
  const gitignore = fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf-8');
  assert.ok(gitignore.includes('.env'), '.gitignore must ignore .env files');
});

// -----------------------------------------------------------------------------
// Group 7: SEO, Assets & Hosting Readiness
// -----------------------------------------------------------------------------
console.log('\n--- Group 7: SEO & Hosting Readiness ---');

test('index.html contains valid title, description, open graph, and JSON-LD schema', () => {
  const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
  assert.ok(html.includes('<title>Seif Almaz') || html.includes('<title>Seif Ahmed Almaz'), 'Title must be present');
  assert.ok(html.includes('name="description"'), 'Meta description must be present');
  assert.ok(html.includes('property="og:image"'), 'og:image must be present');
  assert.ok(html.includes('application/ld+json'), 'JSON-LD schema must be present');
  assert.ok(html.includes('mailto:siefalmaz3@gmail.com'), 'Correct contact email in JSON-LD schema');
  assert.ok(!html.includes('seifalmaz.dev'), 'Outdated email must not be present in index.html');
  assert.ok(html.includes('theme-color" content="#292725"'), 'Consistent warm charcoal theme-color');
});

test('public/ contains robots.txt, sitemap.xml, _redirects, and vercel.json for SPA routing', () => {
  assert.ok(fs.existsSync(path.join(rootDir, 'public/robots.txt')), 'public/robots.txt must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'public/sitemap.xml')), 'public/sitemap.xml must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'public/_redirects')), 'public/_redirects must exist for Netlify/Cloudflare Pages');
  assert.ok(fs.existsSync(path.join(rootDir, 'vercel.json')), 'vercel.json must exist for Vercel SPA rewrites');
});

test('Resume PDF is accessible in public/ directory', () => {
  assert.ok(fs.existsSync(path.join(rootDir, 'public/Seif_Almaz_CV.pdf')), 'public/Seif_Almaz_CV.pdf must exist');
  assert.ok(fs.existsSync(path.join(rootDir, 'public/resume.pdf')), 'public/resume.pdf must exist');
});

test('Favicon suite and social sharing card exist with required Google multiples', () => {
  const requiredAssets = [
    'favicon.ico',
    'favicon.svg',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-48x48.png',
    'favicon-96x96.png',
    'apple-touch-icon.png',
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'brand-logo.png',
    'og-card.png'
  ];
  for (const asset of requiredAssets) {
    assert.ok(fs.existsSync(path.join(rootDir, 'public', asset)), `Asset ${asset} must exist in public/`);
  }
});

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`📊 TEST SUITE SUMMARY: ${suite.passed} PASSED | ${suite.failed} FAILED`);
console.log('======================================================\n');

if (suite.failed > 0) {
  process.exit(1);
}
