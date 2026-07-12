import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cvDir = join(__dirname, 'public', 'cv');

const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
];

const chromePath = CHROME_PATHS.find((p) => existsSync(p));
if (!chromePath) {
  console.error('Chrome não encontrado. Instale o Google Chrome ou defina CHROME_PATH.');
  process.exit(1);
}

const variants = [
  { html: 'CV-JesimielNobrega-PT-Claro.html', pdf: 'CV-JesimielNobrega-PT-Claro.pdf' },
  { html: 'CV-JesimielNobrega-PT-Escuro.html', pdf: 'CV-JesimielNobrega-PT-Escuro.pdf' },
  { html: 'CV-JesimielNobrega-EN-Claro.html', pdf: 'CV-JesimielNobrega-EN-Claro.pdf' },
  { html: 'CV-JesimielNobrega-EN-Escuro.html', pdf: 'CV-JesimielNobrega-EN-Escuro.pdf' },
];

async function generate() {
  console.log(`Chrome: ${chromePath}\n`);
  const browser = await puppeteer.launch({ headless: 'new', executablePath: chromePath });

  for (const { html, pdf } of variants) {
    const page = await browser.newPage();
    await page.goto(`file:///${join(cvDir, html).replace(/\\/g, '/')}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    await page.pdf({
      path: join(cvDir, pdf),
      width: '794px',
      height: '1123px',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await page.close();
    console.log(`  ✓ ${pdf}`);
  }

  await browser.close();
  console.log('\n4 PDFs gerados em public/cv/');
}

generate().catch((err) => {
  console.error('Erro ao gerar PDFs:', err);
  process.exit(1);
});
