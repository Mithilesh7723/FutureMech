const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '..', 'public', 'hero-frames');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'hero-frames-webp');
const QUALITY = 75;
const MAX_WIDTH = 1280;

async function convert() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = fs.readdirSync(INPUT_DIR)
    .filter(f => f.endsWith('.jpg'))
    .sort();

  console.log(`Converting ${files.length} frames to WebP (q${QUALITY}, max ${MAX_WIDTH}px wide)...`);

  let done = 0;
  const BATCH = 20;

  for (let b = 0; b < files.length; b += BATCH) {
    const batch = files.slice(b, b + BATCH);
    await Promise.all(batch.map(async (file) => {
      const inp = path.join(INPUT_DIR, file);
      const outName = file.replace('.jpg', '.webp');
      const out = path.join(OUTPUT_DIR, outName);

      const meta = await sharp(inp).metadata();
      let pipeline = sharp(inp).webp({ quality: QUALITY, effort: 4 });
      if (meta.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      await pipeline.toFile(out);

      done++;
      if (done % 30 === 0 || done === files.length) {
        const origSize = fs.statSync(inp).size;
        const newSize = fs.statSync(out).size;
        const ratio = ((1 - newSize / origSize) * 100).toFixed(0);
        console.log(`  [${done}/${files.length}] ${outName} — ${ratio}% smaller`);
      }
    }));
  }

  // Stats
  let origTotal = 0, newTotal = 0;
  files.forEach(f => {
    origTotal += fs.statSync(path.join(INPUT_DIR, f)).size;
  });
  fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.webp')).forEach(f => {
    newTotal += fs.statSync(path.join(OUTPUT_DIR, f)).size;
  });
  console.log(`\nDone!`);
  console.log(`  Original JPEG: ${(origTotal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  New WebP:      ${(newTotal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Saved:         ${((1 - newTotal / origTotal) * 100).toFixed(0)}%`);
}

convert().catch(console.error);
