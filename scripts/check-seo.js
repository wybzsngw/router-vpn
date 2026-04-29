#!/usr/bin/env node
/**
 * SEO/GEO meta 自检脚本
 *
 * 校验 docs/**\/*.html 是否符合 .cursor/rules/seo-geo-standards.mdc 的规范：
 *   1. <title>            显示宽度 50-65（超出会被搜索结果截断）
 *   2. <meta description> 同时满足：
 *      - 显示宽度 150-320（避免中文摘要过短或过长）
 *      - 字符数 150-160（Bing Webmaster Tools Recommendations 建议区间）
 *   3. 必填 meta 标签：keywords / robots / canonical / og:* / twitter:*
 *   4. 至少存在 1 个 application/ld+json 结构化数据
 *
 * 用法：
 *   node scripts/check-seo.js                  # 检查 docs 下全部 HTML
 *   node scripts/check-seo.js --file docs/index.html
 *   node scripts/check-seo.js --strict         # warning 也以 exit 1 退出
 *   node scripts/check-seo.js --json           # 输出 JSON，便于 CI 集成
 */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const docsDir = path.join(repoRoot, "docs");

const RULES = {
  titleMin: 50,
  titleMax: 65,
  descMin: 150,
  descMax: 320,
  descCharMin: 150,
  descCharMax: 160,
  requiredMeta: [
    { name: "keywords", attr: "name" },
    { name: "robots", attr: "name" },
    { name: "og:title", attr: "property" },
    { name: "og:description", attr: "property" },
    { name: "og:url", attr: "property" },
    { name: "og:image", attr: "property" },
    { name: "twitter:card", attr: "name" },
  ],
  requiredLink: ["canonical"],
};

function parseArgs(argv) {
  const args = { files: [], strict: false, json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--file") {
      args.files.push(argv[i + 1]);
      i += 1;
    } else if (a === "--strict") {
      args.strict = true;
    } else if (a === "--json") {
      args.json = true;
    } else if (a === "-h" || a === "--help") {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${a}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage:
  node scripts/check-seo.js
  node scripts/check-seo.js --file docs/index.html
  node scripts/check-seo.js --strict
  node scripts/check-seo.js --json
`);
}

function listHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

/** 中文/全角字符按 2 计，ASCII/半角按 1 计，与 Bing/Google 显示宽度判定一致 */
function displayWidth(s) {
  let w = 0;
  for (const ch of s) {
    const code = ch.codePointAt(0);
    if (code < 0x80 || (code >= 0xff61 && code <= 0xff9f)) {
      w += 1;
    } else {
      w += 2;
    }
  }
  return w;
}

function getTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : null;
}

function getMeta(html, attr, name) {
  const re = new RegExp(
    `<meta[^>]*\\b${attr}=["']${name}["'][^>]*\\bcontent=["']([^"']*)["']`,
    "i",
  );
  const m = html.match(re);
  return m ? m[1] : null;
}

function getLink(html, rel) {
  const re = new RegExp(
    `<link[^>]*\\brel=["']${rel}["'][^>]*\\bhref=["']([^"']*)["']`,
    "i",
  );
  const m = html.match(re);
  return m ? m[1] : null;
}

function checkFile(file) {
  const html = fs.readFileSync(file, "utf8");
  const errors = [];
  const warnings = [];

  const title = getTitle(html);
  if (!title) {
    errors.push("缺少 <title>");
  } else {
    const w = displayWidth(title);
    if (w < RULES.titleMin) warnings.push(`title 显示宽度 ${w} 偏短 (<${RULES.titleMin})`);
    if (w > RULES.titleMax) warnings.push(`title 显示宽度 ${w} 过长 (>${RULES.titleMax}, 会被截断)`);
  }

  const desc = getMeta(html, "name", "description");
  if (!desc) {
    errors.push("缺少 <meta name=description>");
  } else {
    const w = displayWidth(desc);
    const chars = desc.length;
    if (w < RULES.descMin) errors.push(`description 显示宽度 ${w} 太短 (<${RULES.descMin}, Bing 会标记)`);
    else if (w > RULES.descMax) warnings.push(`description 显示宽度 ${w} 偏长 (>${RULES.descMax})`);
    if (chars < RULES.descCharMin) warnings.push(`description 字符数 ${chars} 太短 (<${RULES.descCharMin}, Bing 会标记)`);
    else if (chars > RULES.descCharMax) warnings.push(`description 字符数 ${chars} 太长 (>${RULES.descCharMax}, Bing 会标记)`);
  }

  for (const r of RULES.requiredMeta) {
    if (!getMeta(html, r.attr, r.name)) {
      errors.push(`缺少 <meta ${r.attr}="${r.name}">`);
    }
  }
  for (const rel of RULES.requiredLink) {
    if (!getLink(html, rel)) errors.push(`缺少 <link rel="${rel}">`);
  }

  const ldJson = (html.match(/<script[^>]*type=["']application\/ld\+json["']/gi) || []).length;
  if (ldJson === 0) errors.push("缺少 application/ld+json 结构化数据");

  return {
    file: path.relative(repoRoot, file).replace(/\\/g, "/"),
    title,
    titleWidth: title ? displayWidth(title) : 0,
    desc,
    descWidth: desc ? displayWidth(desc) : 0,
    descChars: desc ? desc.length : 0,
    ldJsonCount: ldJson,
    errors,
    warnings,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return printHelp();

  const files =
    args.files.length > 0
      ? args.files.map((f) => path.resolve(f))
      : listHtmlFiles(docsDir);
  const results = files.map(checkFile);

  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    const pad = (s, n) => String(s).padStart(n);
    console.log(`${"title".padEnd(5)} | ${"desc".padEnd(5)} | ${"chars".padEnd(5)} | status | file`);
    console.log("-".repeat(100));
    for (const r of results.sort((a, b) => a.descWidth - b.descWidth)) {
      const status = r.errors.length ? "ERROR " : r.warnings.length ? "WARN  " : "OK    ";
      console.log(`${pad(r.titleWidth, 5)} | ${pad(r.descWidth, 5)} | ${pad(r.descChars, 5)} | ${status} | ${r.file}`);
      for (const e of r.errors) console.log(`        - [error] ${e}`);
      for (const w of r.warnings) console.log(`        - [warn]  ${w}`);
    }

    const errCount = results.reduce((n, r) => n + r.errors.length, 0);
    const warnCount = results.reduce((n, r) => n + r.warnings.length, 0);
    console.log("");
    console.log(`Total: ${results.length} files | errors: ${errCount} | warnings: ${warnCount}`);
  }

  const fail = results.some((r) => r.errors.length > 0) || (args.strict && results.some((r) => r.warnings.length > 0));
  if (fail) process.exitCode = 1;
}

try {
  main();
} catch (e) {
  console.error(`[error] ${e.message}`);
  process.exitCode = 1;
}
