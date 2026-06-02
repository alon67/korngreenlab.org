import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function readJson(file) {
  return JSON.parse(await readFile(path.join(root, file), "utf8"));
}

async function fileExists(file) {
  try {
    await stat(path.join(root, file));
    return true;
  } catch {
    return false;
  }
}

async function fileSize(file) {
  const info = await stat(path.join(root, file));
  return info.size;
}

async function imageDimensions(file) {
  const bytes = await readFile(path.join(root, file));
  if (bytes.length >= 24 && bytes.toString("ascii", 1, 4) === "PNG") {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), format: "png" };
  }

  if (bytes.length >= 10 && ["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6))) {
    return { width: bytes.readUInt16LE(6), height: bytes.readUInt16LE(8), format: "gif" };
  }

  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2;
    while (offset < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = bytes[offset + 1];
      const length = bytes.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2, 0xc3].includes(marker)) {
        return {
          width: bytes.readUInt16BE(offset + 7),
          height: bytes.readUInt16BE(offset + 5),
          format: "jpeg",
        };
      }
      offset += 2 + length;
    }
  }

  return { width: null, height: null, format: "unknown" };
}

async function run() {
  const siteMap = await readJson("data/site-map.json");
  const textManifest = (await fileExists("extracted/text-manifest.json")) ? await readJson("extracted/text-manifest.json") : [];
  const imageManifest = (await fileExists("extracted/image-manifest.json")) ? await readJson("extracted/image-manifest.json") : [];
  const assetErrors = (await fileExists("extracted/asset-errors.json")) ? await readJson("extracted/asset-errors.json") : [];

  const textByPath = new Map(textManifest.map((record) => [record.path, record]));
  const textReport = ["# Text Extraction Verification", "", `Generated: ${new Date().toISOString()}`, ""];
  let textFailures = 0;

  for (const page of siteMap.pages) {
    const record = textByPath.get(page.path);
    const rawOk = record ? await fileExists(record.rawFile) : false;
    const contentOk = record ? await fileExists(record.contentFile) : false;
    const enoughText = Number(record?.characterCount || 0) > 100;
    const status = record && rawOk && contentOk && enoughText ? "PASS" : "FAIL";
    if (status === "FAIL") textFailures += 1;
    textReport.push(`- ${status}: ${page.title} (${page.path})`);
    if (record) {
      textReport.push(`  - characters: ${record.characterCount}`);
      textReport.push(`  - headings: ${record.headingCount}`);
      textReport.push(`  - links: ${record.linkCount}`);
    }
  }

  const imageReport = ["# Image Extraction Verification", "", `Generated: ${new Date().toISOString()}`, ""];
  let imageFailures = 0;
  for (const record of imageManifest) {
    const exists = await fileExists(record.localFile);
    const size = exists ? await fileSize(record.localFile) : 0;
    const dimensions = exists ? await imageDimensions(record.localFile) : { width: null, height: null, format: "missing" };
    const status = exists && size > 0 && dimensions.width && dimensions.height ? "PASS" : "REVIEW";
    if (status !== "PASS") imageFailures += 1;
    imageReport.push(`- ${status}: ${record.localFile}`);
    imageReport.push(`  - page: ${record.page}`);
    imageReport.push(`  - bytes: ${size}`);
    imageReport.push(`  - dimensions: ${dimensions.width || "unknown"} x ${dimensions.height || "unknown"} (${dimensions.format})`);
  }

  if (assetErrors.length) {
    imageReport.push("", "## Asset Errors", "");
    for (const error of assetErrors) {
      imageReport.push(`- ${error.page}: ${error.normalizedUrl}`);
      imageReport.push(`  - ${error.error}`);
    }
  }

  await writeFile(path.join(root, "extracted", "text-verification.md"), `${textReport.join("\n")}\n`);
  await writeFile(path.join(root, "extracted", "image-verification.md"), `${imageReport.join("\n")}\n`);

  console.log(`Text verification: ${textFailures} failure(s)`);
  console.log(`Image verification: ${imageFailures} item(s) need review`);
  console.log(`Asset errors: ${assetErrors.length}`);

  if (textFailures > 0 || assetErrors.length > 0) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
