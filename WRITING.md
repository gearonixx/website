# Writing posts

Every post is one Markdown file in [`posts/`](posts/). To publish, add a file
and deploy — the site discovers it automatically.

```bash
./new-post "My post title"     # scaffolds posts/my-post-title.md
$EDITOR posts/my-post-title.md # write it
./d "new post: my post title"  # commit, push, deploy to production
```

The live reference is **[posts/how-this-blog-works.md](posts/how-this-blog-works.md)** —
it demonstrates every feature. Read it next to the rendered page at `/blog/how-this-blog-works`.

## Frontmatter

The YAML block at the top of a post. Only `title` really matters; the rest is optional.

```yaml
---
title: My post title
date: 2026-07-21          # controls ordering (newest first). Quote it or leave bare.
description: One-line subtitle, shown on the post and the blog index.
tags: [notes, security]
cover: /blog/my-post/cover.svg   # optional image under the title
draft: false              # true = hidden in production, visible in `npm run dev`
toc: true                 # set false to hide the table of contents
attachments:
  - label: Slides (PDF)
    href: /files/slides.pdf
    note: 2.1 MB          # optional caption on the download card
---
```

## Body

Standard Markdown, plus:

| You write                     | You get                                  |
| ----------------------------- | ---------------------------------------- |
| `## Heading`                  | section + anchor; feeds the table of contents |
| `![caption](/blog/x/img.svg)` | centered figure; alt text is the caption |
| ` ```python ` fenced block    | syntax highlighting + copy button        |
| `$x^2$` / `$$ … $$`            | inline / display math (KaTeX)            |
| `[text](/blog)`               | internal link (no page reload)           |
| `A claim.[^1]`                | footnote, collected at the bottom        |
| tables, task lists, `> quote` | GitHub-flavoured markdown                 |

Raw HTML also passes through when you need it (e.g. `<details>`).

## Images and attachments

Everything under [`public/`](public/) is served from the site root:

- **Images** → `public/blog/<slug>/pic.svg`  →  reference as `/blog/<slug>/pic.svg`.
  SVG stays crisp at any size; PNG/JPEG are fine for screenshots and photos.
- **Attachments** (PDFs, datasets, zips, PoCs) → `public/files/thing.pdf`  →
  link inline as `/files/thing.pdf`, or list under `attachments:` for a download
  card at the end of the post.

`./new-post` creates the `public/blog/<slug>/` folder for you.

## Local preview

```bash
npm run dev        # http://localhost:5173, live reload, drafts visible
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```
