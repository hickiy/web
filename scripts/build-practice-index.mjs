import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const practiceDir = path.join(rootDir, 'practice');
const outputFile = path.join(rootDir, 'blog/practice.md');
const publicDir = path.join(rootDir, 'public');
const publicPracticeDir = path.join(publicDir, 'practice');
const vitepressConfigFile = path.join(rootDir, '.vitepress', 'config.ts');

async function walkHtmlFiles(dir, baseDir, results) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkHtmlFiles(fullPath, baseDir, results);
      continue;
    }
    if (!entry.isFile()) {
      continue;
    }
    if (path.extname(entry.name).toLowerCase() !== '.html') {
      continue;
    }
    const rel = path.relative(baseDir, fullPath);
    results.push(rel.split(path.sep).join('/'));
  }
}

function normalizeBasePath(base) {
  if (!base || typeof base !== 'string') {
    return '/';
  }
  const trimmed = base.trim();
  if (!trimmed) {
    return '/';
  }
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

async function readBasePath() {
  try {
    const config = await fs.readFile(vitepressConfigFile, 'utf8');
    const match = config.match(/\bbase\s*:\s*['"]([^'"]+)['"]/);
    if (match && match[1]) {
      return normalizeBasePath(match[1]);
    }
  } catch {
    // Ignore config read errors and use default base.
  }
  return '/';
}

function buildIndexMarkdown(htmlFiles, basePath) {
  const tree = new Map();

  for (const rel of htmlFiles) {
    const parts = rel.split('/');
    const category = parts[0] || 'Other';
    const subdir = parts.slice(1, -1).join('/') || '';
    const fileName = parts[parts.length - 1];

    if (!tree.has(category)) {
      tree.set(category, new Map());
    }
    const subMap = tree.get(category);
    if (!subMap.has(subdir)) {
      subMap.set(subdir, []);
    }
    subMap.get(subdir).push(fileName);
  }

  const lines = [];
  lines.push('---');
  lines.push('title: Practice');
  lines.push('---');
  lines.push('');
  lines.push('# Practice');
  lines.push('');
  lines.push('> Auto-generated from the practice directory. Do not edit manually.');
  lines.push('');

  const categories = Array.from(tree.keys()).sort((a, b) => a.localeCompare(b));
  for (const category of categories) {
    lines.push(`## ${category}`);
    lines.push('');
    const subMap = tree.get(category);
    const subdirs = Array.from(subMap.keys()).sort((a, b) => a.localeCompare(b));
    for (const subdir of subdirs) {
      const files = subMap.get(subdir).slice().sort((a, b) => a.localeCompare(b));
      if (subdir) {
        lines.push(`### ${subdir}`);
        lines.push('');
      }
      for (const fileName of files) {
        const label = fileName.replace(/\.html$/i, '');
        const relPath = subdir
          ? `${category}/${subdir}/${fileName}`
          : `${category}/${fileName}`;
        const href = `${basePath}practice/${relPath}`;
        lines.push(
          `- <a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
        );
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

async function syncPracticeToPublic() {
  await fs.rm(publicPracticeDir, { recursive: true, force: true });
  await fs.cp(practiceDir, publicPracticeDir, { recursive: true });
}

async function main() {
  // walk the practice directory to ensure it exists
  try {
    await fs.access(practiceDir);
  } catch {
    console.error('practice directory not found:', practiceDir);
    process.exit(1);
  }

  // Build the practice index
  const basePath = await readBasePath();
  const htmlFiles = [];
  await walkHtmlFiles(practiceDir, practiceDir, htmlFiles);
  const markdown = buildIndexMarkdown(htmlFiles, basePath);
  await fs.writeFile(outputFile, markdown, { encoding: 'utf8', flag: 'w' });
  console.log(`Practice index generated: ${outputFile}`);

  // Sync practice files to public directory
  await syncPracticeToPublic();
  console.log('Practice files synced to public directory.');

  // wait file system to settle
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
