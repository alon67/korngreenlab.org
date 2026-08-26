#!/usr/bin/env node
// Regenerates src/data/publications-schema.json from the publication links.
//
// Structured data for citation engines is only useful if it is accurate, so
// titles, journals, dates and author lists are taken from Crossref rather than
// parsed out of the display citations. Run `npm run schema:publications` after
// adding a paper; the result is committed so the build stays offline.

import { readFile, writeFile } from "node:fs/promises";

const SOURCE = new URL("../src/content/pages/publications.json", import.meta.url);
const TARGET = new URL("../src/data/publications-schema.json", import.meta.url);
const MAILTO = "alon.korngreen@biu.ac.il"; // Crossref asks for a contact in the UA

// Patterns that let a DOI be read straight off a publisher URL.
const DOI_FROM_URL = [
  /doi\.org\/(10\.[^\s"?#]+)/,
  /\/doi\/(?:abs|full|pdf)?\/?(10\.[^\s"?#]+)/,
  /frontiersin\.org\/.*?articles\/(10\.\d{4,9}\/[^/\s"?#]+)/,
  /link\.springer\.com\/(?:article|book|chapter)\/(10\.\d{4,9}\/[^/\s"?#]+)/,
  /[?&]id=(10\.\d{4,9}\/[^&\s"#]+)/,
];

// Publishers whose article IDs are the DOI suffix.
const DOI_FROM_PATTERN = [
  { test: /nature\.com\/articles\/([a-z0-9-]+)$/i, doi: (m) => `10.1038/${m[1]}` },
];

function doiFor(url) {
  for (const re of DOI_FROM_URL) {
    const m = url.match(re);
    if (m) return decodeURIComponent(m[1]).replace(/[.,;]+$/, "");
  }
  for (const { test, doi } of DOI_FROM_PATTERN) {
    const m = url.match(test);
    if (m) return doi(m);
  }
  return null;
}

async function crossref(path) {
  const res = await fetch(`https://api.crossref.org${path}`, {
    headers: { "User-Agent": `korngreenlab.org schema builder (mailto:${MAILTO})` },
  });
  if (!res.ok) return null;
  return (await res.json()).message ?? null;
}

/** Ask Crossref to identify a paper we only have a publisher URL for. */
async function findDoiByTitle(citation) {
  const title = citation
    .replace(/^.*?\(\d{4}\)\.?\s*/, "")     // drop the author/year prefix
    .split(/\.\s+[A-Z][a-z]*\.?\s/)[0]      // stop before the journal abbreviation
    .slice(0, 220);
  if (title.length < 25) return null;
  const msg = await crossref(`/works?rows=3&select=DOI,title,score&query.bibliographic=${encodeURIComponent(title)}`);
  const hit = msg?.items?.[0];
  if (!hit || hit.score < 60) return null;
  // Only trust it if the returned title really is the one we asked about.
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const got = norm(hit.title?.[0] ?? "");
  const want = norm(title);
  const overlap = want.split(" ").filter((w) => w.length > 4 && got.includes(w)).length;
  return overlap >= 4 ? hit.DOI : null;
}

function articleNode(work, url, doi, fallbackName) {
  const authors = (work?.author ?? []).map((a) => {
    const name = [a.given, a.family].filter(Boolean).join(" ").trim();
    const node = { "@type": "Person", name: name || a.name || "" };
    if (a.ORCID) node.identifier = a.ORCID.replace(/^https?:\/\/orcid\.org\//, "");
    return node;
  });
  const parts = work?.["published-print"]?.["date-parts"]?.[0] ?? work?.["published-online"]?.["date-parts"]?.[0] ?? work?.issued?.["date-parts"]?.[0];
  const node = {
    "@type": work?.type === "book" ? "Book" : "ScholarlyArticle",
    name: work?.title?.[0] ?? fallbackName,
    url,
  };
  if (doi) {
    node["@id"] = `https://doi.org/${doi}`;
    node.identifier = [{ "@type": "PropertyValue", propertyID: "DOI", value: doi }];
    node.sameAs = `https://doi.org/${doi}`;
  }
  if (authors.length) node.author = authors;
  if (parts?.[0]) node.datePublished = parts.slice(0, 3).map((n, i) => (i ? String(n).padStart(2, "0") : String(n))).join("-");
  const journal = work?.["container-title"]?.[0];
  if (journal) node.isPartOf = { "@type": "Periodical", name: journal };
  if (work?.volume) node.volumeNumber = work.volume;
  if (work?.page) node.pagination = work.page;
  if (work?.publisher) node.publisher = { "@type": "Organization", name: work.publisher };
  return node;
}

const page = JSON.parse(await readFile(SOURCE, "utf8"));
const citations = new Set(page.textLines);
// Publication links only: skip the profile and social links that share the file.
const links = page.links.filter((l) => citations.has(l.text) && !/facebook|plus\.google|flickr|scholar\.google/.test(l.href));

const nodes = [];
let resolved = 0;
for (const link of links) {
  let doi = doiFor(link.href);
  if (!doi) doi = await findDoiByTitle(link.text);
  const work = doi ? await crossref(`/works/${encodeURIComponent(doi)}`) : null;
  if (work) resolved += 1;
  nodes.push(articleNode(work, link.href, work ? doi : null, link.text));
  process.stdout.write(`  ${work ? "✓" : "·"} ${(doi ?? "no DOI").padEnd(34)} ${link.text.slice(0, 52)}\n`);
}

await writeFile(TARGET, JSON.stringify(nodes, null, 2) + "\n");
console.log(`\n${nodes.length} publications, ${resolved} with verified Crossref metadata -> src/data/publications-schema.json`);
