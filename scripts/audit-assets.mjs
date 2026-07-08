import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = process.cwd();
const publicDir = join(root, "public");
const sourceDirs = ["app", "components", "lib", "scripts"];
const largeAssetBytes = 1024 * 1024;

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

const sourceText = (await Promise.all(sourceDirs.map(async (dir) => {
  const full = join(root, dir);
  const files = await walk(full).catch(() => []);
  const chunks = await Promise.all(files.map(async (file) => readFile(file, "utf8").catch(() => "")));
  return chunks.join("\n");
}))).join("\n");

const publicFiles = await walk(publicDir);
const largeAssets = [];
for (const file of publicFiles) {
  const info = await stat(file);
  if (info.size < largeAssetBytes) continue;
  const publicPath = `/${relative(publicDir, file).split(sep).join("/")}`;
  const basename = publicPath.split("/").pop() || publicPath;
  const referenced = sourceText.includes(publicPath) || sourceText.includes(basename);
  largeAssets.push({ publicPath, size: info.size, referenced });
}

if (!largeAssets.length) {
  console.log("No public assets over 1MB.");
  process.exit(0);
}

for (const asset of largeAssets.sort((a, b) => b.size - a.size)) {
  const mb = (asset.size / 1024 / 1024).toFixed(2);
  console.log(`${asset.referenced ? "✓" : "!"} ${asset.publicPath} ${mb}MB ${asset.referenced ? "referenced" : "not referenced"}`);
}

const unused = largeAssets.filter((asset) => !asset.referenced);
if (unused.length) {
  console.log(`${unused.length} large public asset${unused.length === 1 ? " is" : "s are"} not referenced. Consider moving them out of public/ before the next performance push.`);
}
