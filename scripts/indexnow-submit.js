#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");

const repoRoot = path.resolve(__dirname, "..");
const defaultKey = "cecc9e5f37a34ece8705857a3a31b0ca";
const defaultOrigin = "https://www.aixiaobai168.com";
const defaultKeyFile = path.join(repoRoot, "docs", `${defaultKey}.txt`);
const defaultSitemap = path.join(repoRoot, "docs", "sitemap.xml");

function parseArgs(argv) {
  const args = {
    endpoint: "https://api.indexnow.org/indexnow",
    origin: defaultOrigin,
    keyFile: defaultKeyFile,
    sitemap: defaultSitemap,
    urls: [],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--url") {
      args.urls.push(argv[i + 1]);
      i += 1;
      continue;
    }

    if (arg === "--origin") {
      args.origin = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === "--endpoint") {
      args.endpoint = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === "--key-file") {
      args.keyFile = path.resolve(argv[i + 1]);
      i += 1;
      continue;
    }

    if (arg === "--sitemap") {
      args.sitemap = path.resolve(argv[i + 1]);
      i += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  node scripts/indexnow-submit.js
  node scripts/indexnow-submit.js --url https://www.aixiaobai168.com/
  node scripts/indexnow-submit.js --url https://www.aixiaobai168.com/pages/cursor-guide --url https://www.aixiaobai168.com/pages/chatgpt-plus-guide

Options:
  --url <url>        Submit one or more canonical URLs. If omitted, all URLs in docs/sitemap.xml are submitted.
  --origin <origin>  Site origin. Defaults to ${defaultOrigin}
  --endpoint <url>   IndexNow endpoint. Defaults to https://api.indexnow.org/indexnow
  --key-file <path>  Path to the hosted IndexNow key file. Defaults to docs/${defaultKey}.txt
  --sitemap <path>   Path to sitemap.xml. Defaults to docs/sitemap.xml
`);
}

function readKey(keyFile) {
  const key = fs.readFileSync(keyFile, "utf8").trim();

  if (!key) {
    throw new Error(`Key file is empty: ${keyFile}`);
  }

  const fileStem = path.basename(keyFile, path.extname(keyFile));
  if (fileStem !== key) {
    console.warn(
      `[warn] Key filename (${fileStem}) does not match key contents. This is valid only if you also submit keyLocation explicitly.`,
    );
  }

  return key;
}

function extractUrlsFromSitemap(sitemapFile) {
  const xml = fs.readFileSync(sitemapFile, "utf8");
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];

  if (matches.length === 0) {
    throw new Error(`No <loc> entries found in sitemap: ${sitemapFile}`);
  }

  return matches.map((match) => match[1].trim());
}

function normalizeUrls(rawUrls, origin) {
  const siteOrigin = new URL(origin).origin;
  const unique = new Set();

  for (const rawUrl of rawUrls) {
    if (!rawUrl) {
      continue;
    }

    const url = new URL(rawUrl, siteOrigin);

    if (url.origin !== siteOrigin) {
      throw new Error(`URL does not belong to ${siteOrigin}: ${rawUrl}`);
    }

    url.hash = "";
    unique.add(url.toString());
  }

  return [...unique];
}

function postJson(endpoint, payload) {
  const url = new URL(endpoint);
  const body = JSON.stringify(payload, null, 2);

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || 443,
        path: `${url.pathname}${url.search}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (response) => {
        let responseBody = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          responseBody += chunk;
        });
        response.on("end", () => {
          resolve({
            statusCode: response.statusCode,
            body: responseBody.trim(),
          });
        });
      },
    );

    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  const origin = new URL(args.origin).origin;
  const host = new URL(origin).host;
  const key = readKey(args.keyFile);
  const urls = normalizeUrls(
    args.urls.length > 0 ? args.urls : extractUrlsFromSitemap(args.sitemap),
    origin,
  );
  const keyLocation = `${origin}/${path.basename(args.keyFile)}`;
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  };

  console.log(`[info] Submitting ${urls.length} URL(s) to ${args.endpoint}`);
  console.log(`[info] Host: ${host}`);
  console.log(`[info] Key file: ${keyLocation}`);

  const result = await postJson(args.endpoint, payload);

  console.log(`[info] Response status: ${result.statusCode}`);
  if (result.body) {
    console.log(result.body);
  }

  if (![200, 202].includes(result.statusCode)) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`[error] ${error.message}`);
  process.exitCode = 1;
});
