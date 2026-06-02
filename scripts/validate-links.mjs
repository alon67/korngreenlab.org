import { readFile } from "node:fs/promises";

const internalPaths = new Set(JSON.parse(await readFile("data/site-map.json", "utf8")).pages.map((page) => page.path));
const markdownFiles = JSON.parse(await readFile("extracted/text-manifest.json", "utf8")).map((record) => record.contentFile);
const missing = [];

for (const file of markdownFiles) {
  const markdown = await readFile(file, "utf8");
  const matches = markdown.matchAll(/\]\((\/[^)#?]*)/g);
  for (const match of matches) {
    const target = match[1] || "/";
    if (!internalPaths.has(target)) missing.push({ file, target });
  }
}

if (missing.length) {
  console.log("Missing internal link targets:");
  for (const item of missing) console.log(`- ${item.file}: ${item.target}`);
  process.exitCode = 1;
} else {
  console.log("Internal link targets look valid.");
}

