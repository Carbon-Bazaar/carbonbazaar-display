// Copies the marketplace's static export (marketplace/out) into the website's
// static export (out/marketplace), so one deploy of `out/` serves both:
//   carbonbazaar.shop/             -> website
//   carbonbazaar.shop/marketplace  -> marketplace
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'marketplace', 'out');
const dest = path.join(__dirname, '..', 'out', 'marketplace');

if (!fs.existsSync(src)) {
  console.error('marketplace/out not found. Run `npm run build:marketplace` first.');
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log(`Copied ${src} -> ${dest}`);
