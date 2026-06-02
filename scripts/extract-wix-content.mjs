import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteMapPath = path.join(root, "data", "site-map.json");
const rawDir = path.join(root, "extracted", "raw");
const contentDir = path.join(root, "extracted", "content");
const assetDir = path.join(root, "extracted", "assets");

function pageSlug(pagePath) {
  return pagePath === "/" ? "home" : pagePath.replace(/^\/+/, "").replace(/\/+$/, "").replace(/[^a-z0-9-]+/gi, "-");
}

function normalizeWixImageUrl(url) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("static.wixstatic.com")) return url;
    const marker = "/v1/";
    const markerIndex = parsed.pathname.indexOf(marker);
    if (markerIndex === -1) return url;
    parsed.pathname = parsed.pathname.slice(0, markerIndex);
    parsed.search = "";
    return parsed.toString();
  } catch {
    return url;
  }
}

function assetFileName(url, index) {
  const parsed = new URL(url);
  const base = path.basename(parsed.pathname).replace(/[^a-z0-9._-]+/gi, "-") || `asset-${index}`;
  return `${String(index).padStart(3, "0")}-${base}`;
}

function markdownForPage(page, extracted) {
  const lines = [
    `# ${extracted.title || page.title}`,
    "",
    `Source: ${page.url}`,
    `Extracted: ${extracted.extractedAt}`,
    "",
    "## Visible Text",
    "",
  ];

  for (const line of extracted.textLines) {
    lines.push(line);
    lines.push("");
  }

  lines.push("## Links", "");
  for (const link of extracted.links) {
    lines.push(`- [${link.text || link.href}](${link.href})`);
  }

  return `${lines.join("\n").trim()}\n`;
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 600;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 150);
    });
  });
  await page.waitForTimeout(1000);
}

async function extractPage(page, entry) {
  await page.goto(entry.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
  await autoScroll(page);

  return page.evaluate(() => {
    const visible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
    };

    const textLines = [];
    const seenLines = new Set();
    for (const rawLine of document.body.innerText.split(/\n+/)) {
      const line = rawLine.replace(/\s+/g, " ").trim();
      if (!line || seenLines.has(line)) continue;
      seenLines.add(line);
      textLines.push(line);
    }

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(visible)
      .map((element) => ({
        level: Number(element.tagName.slice(1)),
        text: element.innerText.replace(/\s+/g, " ").trim(),
      }))
      .filter((heading) => heading.text);

    const links = [...document.querySelectorAll("a[href]")]
      .filter(visible)
      .map((element) => ({
        text: element.innerText.replace(/\s+/g, " ").trim(),
        href: element.href,
      }))
      .filter((link) => link.href);

    const imageCandidates = [];
    const addImage = (url, metadata = {}) => {
      if (!url || url.startsWith("data:") || url.startsWith("blob:")) return;
      imageCandidates.push({
        sourceUrl: url,
        alt: metadata.alt || "",
        caption: metadata.caption || "",
      });
    };

    for (const image of document.querySelectorAll("img")) {
      if (!visible(image)) continue;
      addImage(image.currentSrc || image.src, {
        alt: image.alt || "",
        caption: image.closest("figure")?.querySelector("figcaption")?.innerText?.trim() || "",
      });
    }

    for (const element of document.querySelectorAll("*")) {
      if (!visible(element)) continue;
      const background = window.getComputedStyle(element).backgroundImage;
      const matches = [...background.matchAll(/url\(["']?([^"')]+)["']?\)/g)];
      for (const match of matches) addImage(new URL(match[1], document.baseURI).href);
    }

    const uniqueImages = [];
    const seenImages = new Set();
    for (const image of imageCandidates) {
      if (seenImages.has(image.sourceUrl)) continue;
      seenImages.add(image.sourceUrl);
      uniqueImages.push(image);
    }

    return {
      title: document.title,
      language: document.documentElement.lang || "",
      direction: document.documentElement.dir || "",
      extractedAt: new Date().toISOString(),
      headings,
      links,
      images: uniqueImages,
      textLines,
      counts: {
        headings: headings.length,
        links: links.length,
        images: uniqueImages.length,
        textLines: textLines.length,
        characters: textLines.join("\n").length,
      },
    };
  });
}

async function downloadAsset(url, destination) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, bytes);
  return bytes.length;
}

async function main() {
  await mkdir(rawDir, { recursive: true });
  await mkdir(contentDir, { recursive: true });
  await mkdir(assetDir, { recursive: true });

  const siteMap = JSON.parse(await readFile(siteMapPath, "utf8"));
  siteMap.generatedAt = siteMap.generatedAt || new Date().toISOString();

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const textManifest = [];
  const imageManifest = [];
  const assetErrors = [];
  const gallery = [];

  for (const entry of siteMap.pages) {
    const slug = pageSlug(entry.path);
    console.log(`Extracting ${entry.url}`);
    const extracted = await extractPage(page, entry);
    const rawHtml = await page.content();

    await writeFile(path.join(rawDir, `${slug}.html`), rawHtml);
    await writeFile(path.join(contentDir, `${slug}.md`), markdownForPage(entry, extracted));

    textManifest.push({
      slug,
      title: entry.title,
      sourceUrl: entry.url,
      path: entry.path,
      language: entry.language,
      extractedAt: extracted.extractedAt,
      documentTitle: extracted.title,
      headingCount: extracted.counts.headings,
      linkCount: extracted.counts.links,
      imageCount: extracted.counts.images,
      textLineCount: extracted.counts.textLines,
      characterCount: extracted.counts.characters,
      rawFile: `extracted/raw/${slug}.html`,
      contentFile: `extracted/content/${slug}.md`,
    });

    let imageIndex = 1;
    for (const image of extracted.images) {
      const normalizedUrl = normalizeWixImageUrl(image.sourceUrl);
      const localName = `${slug}-${assetFileName(normalizedUrl, imageIndex)}`;
      const localPath = path.join(assetDir, localName);
      const manifestRecord = {
        page: entry.path,
        pageTitle: entry.title,
        sourceUrl: image.sourceUrl,
        normalizedUrl,
        localFile: `extracted/assets/${localName}`,
        alt: image.alt,
        caption: image.caption,
        bytes: 0,
      };

      try {
        manifestRecord.bytes = await downloadAsset(normalizedUrl, localPath);
        imageManifest.push(manifestRecord);
        if (entry.path === "/lab-pictures") gallery.push(manifestRecord);
      } catch (error) {
        assetErrors.push({
          ...manifestRecord,
          error: error.message,
        });
      }
      imageIndex += 1;
    }
  }

  await browser.close();

  await writeFile(path.join(root, "extracted", "text-manifest.json"), `${JSON.stringify(textManifest, null, 2)}\n`);
  await writeFile(path.join(root, "extracted", "image-manifest.json"), `${JSON.stringify(imageManifest, null, 2)}\n`);
  await writeFile(path.join(root, "extracted", "asset-errors.json"), `${JSON.stringify(assetErrors, null, 2)}\n`);
  await writeFile(path.join(root, "extracted", "gallery.json"), `${JSON.stringify(gallery, null, 2)}\n`);
  await writeFile(siteMapPath, `${JSON.stringify(siteMap, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

