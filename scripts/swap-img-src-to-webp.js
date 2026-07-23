/**
 * 递归扫描 docs/**\/*.html，把 <img> 标签的 src="*.png" 和 src='*.png' 改成 .webp。
 * 只替换 src= 属性，不碰 content=、href=、JSON-LD。
 * 安全正则: /(src=["'])([^"']+?)\.png(["'])/g
 *
 * 验证阶段：扫描所有 html 中 webp src，检查对应文件是否存在，列出缺失项。
 */
const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.resolve(__dirname, '../docs');

function collectHtmls(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmls(full, list);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      list.push(full);
    }
  }
  return list;
}

function resolveWebpPath(htmlFile, srcAttr) {
  // srcAttr 可能是绝对路径（/images/...）或相对路径（../images/...）
  let filePath;
  if (srcAttr.startsWith('/')) {
    filePath = path.join(DOCS_DIR, srcAttr);
  } else {
    filePath = path.resolve(path.dirname(htmlFile), srcAttr);
  }
  return filePath;
}

const SRC_PNG_RE = /(src=["'])([^"']+?)\.png(["'])/g;

function main() {
  const htmls = collectHtmls(DOCS_DIR);
  let changedFiles = 0;
  let totalReplacements = 0;
  const missingWebp = [];

  for (const htmlFile of htmls) {
    const original = fs.readFileSync(htmlFile, 'utf8');
    let changed = 0;
    const updated = original.replace(SRC_PNG_RE, (match, q1, p, q2) => {
      changed++;
      return `${q1}${p}.webp${q2}`;
    });

    if (changed > 0) {
      fs.writeFileSync(htmlFile, updated, 'utf8');
      changedFiles++;
      totalReplacements += changed;
      console.log(`[CHANGED] ${path.relative(DOCS_DIR, htmlFile)} (${changed} 处)`);
    }
  }

  // 验证：扫描所有 html 的 webp src，检查文件是否存在
  console.log('\n========== 验证 WebP 文件存在性 ==========');
  const htmlsAgain = collectHtmls(DOCS_DIR);
  const WEBP_SRC_RE = /src=["']([^"']+?\.webp)["']/g;
  for (const htmlFile of htmlsAgain) {
    const content = fs.readFileSync(htmlFile, 'utf8');
    let m;
    while ((m = WEBP_SRC_RE.exec(content)) !== null) {
      const webpSrc = m[1];
      const webpAbsPath = resolveWebpPath(htmlFile, webpSrc);
      if (!fs.existsSync(webpAbsPath)) {
        missingWebp.push({ html: path.relative(DOCS_DIR, htmlFile), src: webpSrc, resolved: webpAbsPath });
      }
    }
  }

  if (missingWebp.length === 0) {
    console.log('所有 WebP 文件均存在，无缺失。');
  } else {
    console.log(`警告：${missingWebp.length} 个 WebP 文件缺失：`);
    for (const item of missingWebp) {
      console.log(`  [MISSING] ${item.html} -> ${item.src}`);
    }
  }

  console.log('\n========== 汇总 ==========');
  console.log(`修改的 HTML 文件数: ${changedFiles}`);
  console.log(`替换处数: ${totalReplacements}`);
  console.log(`缺失 WebP 数: ${missingWebp.length}`);
}

main();
