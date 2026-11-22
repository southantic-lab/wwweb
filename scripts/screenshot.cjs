// usage: node shot.js <path> <out> [mobile] [fullPage] [waitMs] [scale]
const { chromium } = require('playwright');
(async () => {
  const [, , path, out, mobile, full, wait, scale] = process.argv;
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const isM = mobile === '1';
  const ctx = await browser.newContext({
    viewport: isM ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    deviceScaleFactor: Number(scale || 1),
    isMobile: isM, hasTouch: isM,
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 300)); });
  await page.goto('http://localhost:3000' + path, { waitUntil: 'networkidle', timeout: 120000 });
  if (full === '1') {
    // scroll through to trigger in-view animations
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.evaluate(v => window.scrollTo(0, v), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.waitForTimeout(Number(wait || 2500));
  if (full === '1') await page.addStyleTag({ content: 'body{position:relative} .fixed.bottom-0{position:absolute!important}' });
  await page.screenshot({ path: out, fullPage: full === '1' });
  console.log(JSON.stringify({ out, errors: errors.slice(0, 15) }));
  await browser.close();
})();
