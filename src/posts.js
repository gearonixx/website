// Loads every Markdown file in /posts at build time and turns it into a post
// object. To publish a new post you only need to drop a `.md` file in /posts —
// this file discovers it automatically. See WRITING.md for the full guide.

import { load as loadYaml } from "js-yaml";
import GithubSlugger from "github-slugger";

// Vite reads all posts as raw strings during the build. The glob is relative to
// this file, so `../posts/*.md` points at the top-level /posts directory.
const modules = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  // Optional YAML frontmatter delimited by `---` at the very top of the file.
  const match = /^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, content: raw };
  let data = {};
  try {
    data = loadYaml(match[1]) || {};
  } catch (err) {
    console.error("Could not parse frontmatter:", err);
  }
  return { data, content: raw.slice(match[0].length) };
}

function coerceDate(value) {
  if (value == null) return "";
  // js-yaml turns unquoted `2026-07-21` into a Date; normalise back to a string.
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Pull headings out of the markdown so we can build a table of contents whose
// anchor links line up with the ids that rehype-slug generates at render time.
// Both use github-slugger with a fresh instance per document, so the slugs match.
function extractHeadings(markdown) {
  const noCode = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "");
  const slugger = new GithubSlugger();
  const headings = [];
  const re = /^(#{1,6})[ \t]+(.+?)[ \t]*#*$/gm;
  let m;
  while ((m = re.exec(noCode))) {
    const text = m[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> text
      .replace(/[*_`~]/g, "")
      .trim();
    headings.push({ depth: m[1].length, text, id: slugger.slug(text) });
  }
  return headings;
}

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = data.slug || slugFromPath(path);
    return {
      slug,
      title: data.title || slug,
      date: coerceDate(data.date),
      description: data.description || "",
      tags: data.tags || [],
      attachments: data.attachments || [],
      cover: data.cover || "",
      draft: Boolean(data.draft),
      toc: data.toc !== false,
      content,
      readingTime: readingTime(content),
      headings: extractHeadings(content),
    };
  })
  // Drafts are visible while developing (npm run dev) but hidden in production.
  .filter((p) => import.meta.env.DEV || !p.draft)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(value) {
  if (!value) return "";
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value + "T00:00:00" : value;
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
