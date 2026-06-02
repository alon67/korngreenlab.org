import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentDir = path.join(root, "src", "content", "pages");
const assetDir = path.join(root, "src", "assets", "extracted");

const boilerplate = new Set([
  "Skip to Main Content",
  "THE KORNGREEN LAB",
  "Cellular and Computational Neurophysiology",
  "Home",
  "Research",
  "Publications",
  "People",
  "Contact",
]);

const pageTitles = new Map([
  ["/", "Home"],
  ["/about1", "About"],
  ["/research", "Research"],
  ["/themes", "Themes"],
  ["/resources", "Resources"],
  ["/research-hebrew", "Research Hebrew"],
  ["/publications", "Publications"],
  ["/lab-members", "Lab Members"],
  ["/copy-of-lab-members", "People"],
  ["/curriculum-vita", "Curriculum Vita"],
  ["/collaborators", "Collaborators"],
  ["/positions", "Positions"],
  ["/lab-pictures", "Lab Pictures"],
  ["/contact", "Contact"],
]);

function slugFromPath(pagePath) {
  return pagePath === "/" ? "home" : pagePath.replace(/^\/+/, "").replace(/\/+$/, "").replace(/[^a-z0-9-]+/gi, "-");
}

function parseExtractedMarkdown(markdown) {
  const visibleMatch = markdown.match(/## Visible Text\n\n([\s\S]*?)(?:\n## Links\n\n|$)/);
  const linksMatch = markdown.match(/## Links\n\n([\s\S]*?)$/);
  const textLines = visibleMatch
    ? visibleMatch[1].split(/\n+/).map((line) => line.trim()).filter(Boolean)
    : [];

  const links = [];
  if (linksMatch) {
    for (const line of linksMatch[1].split("\n")) {
      const match = line.match(/^- \[(.*)\]\((.*)\)$/);
      if (!match) continue;
      links.push({ text: match[1], href: match[2] });
    }
  }

  return { textLines, links };
}

function cleanTextLines(pagePath, lines) {
  const title = pageTitles.get(pagePath);
  const cleaned = [];
  let previous = "";

  for (const line of lines) {
    if (boilerplate.has(line)) continue;
    if (line === title && cleaned.length === 0) continue;
    if (line === previous) continue;
    cleaned.push(line);
    previous = line;
  }

  return cleaned;
}

function isPrimaryContentImage(image) {
  const lowerAlt = `${image.alt || ""} ${image.localFile || ""}`.toLowerCase();
  if (lowerAlt.includes("facebook") || lowerAlt.includes("google+") || lowerAlt.includes("flickr")) return false;
  if (image.localFile.includes("0aa619b4bedb4c449a01ddd6c6a19106")) return false;
  return true;
}

function normalizeHref(href) {
  try {
    const parsed = new URL(href);
    if (parsed.hostname === "www.korngreenlab.org" || parsed.hostname === "korngreenlab.org") {
      return parsed.pathname || "/";
    }
  } catch {
    return href;
  }
  return href;
}

function cleanLinks(links) {
  const seen = new Set();
  const cleaned = [];
  for (const link of links) {
    const href = normalizeHref(link.href);
    const key = `${link.text}|${href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (["Home", "Research", "Publications", "People", "Contact"].includes(link.text)) continue;
    cleaned.push({ text: link.text || href, href });
  }
  return cleaned;
}

async function main() {
  await mkdir(contentDir, { recursive: true });
  await mkdir(assetDir, { recursive: true });

  const siteMap = JSON.parse(await readFile(path.join(root, "data", "site-map.json"), "utf8"));
  const imageManifest = JSON.parse(await readFile(path.join(root, "extracted", "image-manifest.json"), "utf8"));

  const copied = new Set();
  for (const image of imageManifest) {
    const basename = path.basename(image.localFile);
    if (copied.has(basename)) continue;
    copied.add(basename);
    await copyFile(path.join(root, image.localFile), path.join(assetDir, basename));
  }

  for (const page of siteMap.pages) {
    const slug = slugFromPath(page.path);
    const markdown = await readFile(path.join(root, "extracted", "content", `${slug}.md`), "utf8");
    const parsed = parseExtractedMarkdown(markdown);
    const images = imageManifest
      .filter((image) => image.page === page.path && isPrimaryContentImage(image))
      .map((image) => ({
        src: path.basename(image.localFile),
        alt: image.alt || page.title,
        caption: image.caption || "",
      }));

    const record = {
      title: pageTitles.get(page.path) || page.title,
      sourceTitle: page.title,
      path: page.path,
      sourceUrl: page.url,
      language: page.language,
      direction: page.language === "he" ? "rtl" : "ltr",
      textLines: cleanTextLines(page.path, parsed.textLines),
      links: cleanLinks(parsed.links),
      images,
    };

    await writeFile(path.join(contentDir, `${slug}.json`), `${JSON.stringify(record, null, 2)}\n`);
  }

  console.log(`Generated ${siteMap.pages.length} page content records.`);
  console.log(`Copied ${copied.size} extracted assets into src/assets/extracted/.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

