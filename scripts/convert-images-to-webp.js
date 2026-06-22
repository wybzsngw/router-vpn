/**
 * 递归扫描 docs/images/**\/*.png，用 sharp 转成同名 .webp（quality:80, effort:4）
 * 已存在的 webp 跳过。
 * 绝不删除原 PNG。
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../docs/images');

function collectPngs(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPngs(full, list);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      list.push(full);
    }
  }
  return list;
}

async function main() {
  const pngs = collectPngs(IMAGES_DIR);
  let converted = 0;
  let skipped = 0;
  let savedBytes = 0;

  for (const pngPath of pngs) {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    if (fs.existsSync(webpPath)) {
      console.log(`[SKIP] ${path.relative(IMAGES_DIR, webpPath)}`);
      skipped++;
      continue;
    }
    await sharp(pngPath)
      .webp({ quality: 80, effort: 4 })
      .toFile(webpPath);

    const pngSize = fs.statSync(pngPath).size;
    const webpSize = fs.statSync(webpPath).size;
    const saved = pngSize - webpSize;
    savedBytes += saved;
    converted++;
    console.log(
      `[DONE] ${path.relative(IMAGES_DIR, pngPath)} ` +
      `${(pngSize / 1024).toFixed(1)}KB -> ${(webpSize / 1024).toFixed(1)}KB ` +
      `(节省 ${(saved / 1024).toFixed(1)}KB)`
    );
  }

  console.log('\n========== 汇总 ==========');
  console.log(`转换完成: ${converted} 张`);
  console.log(`跳过(已存在): ${skipped} 张`);
  console.log(`总节省体积: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(err => { console.error(err); process.exit(1); });
