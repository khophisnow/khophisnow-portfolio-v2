import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";

const root = process.cwd();
const publicDir = join(root, "public");
const sourceDirs = ["app", "components", "lib", "scripts", "tests"];

const budgets = {
  maxSingleVideoBytes: 3 * 1024 * 1024,
  maxSingleImageBytes: 700 * 1024,
  maxReferencedVideoBytes: 16 * 1024 * 1024,
  maxReferencedMediaBytes: 20 * 1024 * 1024,
  maxUnusedLargeAssetBytes: 1024 * 1024,
};

const mediaExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".mp4", ".png", ".webm", ".webp"]);
const videoExtensions = new Set([".mp4", ".webm"]);
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function formatBytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)}MB`;
}

const sourceText = (await Promise.all(sourceDirs.map(async (dir) => {
  const full = join(root, dir);
  const files = await walk(full).catch(() => []);
  const chunks = await Promise.all(files.map(async (file) => readFile(file, "utf8").catch(() => "")));
  return chunks.join("\n");
}))).join("\n");

const publicFiles = await walk(publicDir);
const media = [];
for (const file of publicFiles) {
  const ext = extname(file).toLowerCase();
  if (!mediaExtensions.has(ext)) continue;
  const info = await stat(file);
  const publicPath = `/${relative(publicDir, file).split(sep).join("/")}`;
  const basename = publicPath.split("/").pop() || publicPath;
  const referenced = sourceText.includes(publicPath) || sourceText.includes(basename);
  media.push({ publicPath, size: info.size, ext, referenced });
}

const referencedMedia = media.filter((asset) => asset.referenced);
const referencedVideos = referencedMedia.filter((asset) => videoExtensions.has(asset.ext));
const referencedMediaBytes = referencedMedia.reduce((sum, asset) => sum + asset.size, 0);
const referencedVideoBytes = referencedVideos.reduce((sum, asset) => sum + asset.size, 0);

const failures = [];
for (const asset of media) {
  if (!asset.referenced && asset.size > budgets.maxUnusedLargeAssetBytes) failures.push(`${asset.publicPath} is ${formatBytes(asset.size)} and not referenced`);
  if (videoExtensions.has(asset.ext) && asset.size > budgets.maxSingleVideoBytes) failures.push(`${asset.publicPath} video exceeds ${formatBytes(budgets.maxSingleVideoBytes)} (${formatBytes(asset.size)})`);
  if (imageExtensions.has(asset.ext) && asset.size > budgets.maxSingleImageBytes) failures.push(`${asset.publicPath} image exceeds ${formatBytes(budgets.maxSingleImageBytes)} (${formatBytes(asset.size)})`);
}

if (referencedVideoBytes > budgets.maxReferencedVideoBytes) failures.push(`Referenced video total exceeds ${formatBytes(budgets.maxReferencedVideoBytes)} (${formatBytes(referencedVideoBytes)})`);
if (referencedMediaBytes > budgets.maxReferencedMediaBytes) failures.push(`Referenced media total exceeds ${formatBytes(budgets.maxReferencedMediaBytes)} (${formatBytes(referencedMediaBytes)})`);

console.log(`Referenced media: ${formatBytes(referencedMediaBytes)} / ${formatBytes(budgets.maxReferencedMediaBytes)}`);
console.log(`Referenced videos: ${formatBytes(referencedVideoBytes)} / ${formatBytes(budgets.maxReferencedVideoBytes)}`);
console.log(`Largest media asset: ${media.sort((a, b) => b.size - a.size)[0]?.publicPath || "none"}`);

if (failures.length) {
  console.error("Performance budget failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Performance budget passed.");
