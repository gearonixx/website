---
title: How this blog works
date: 2026-07-21
description: A tour of the writing setup — Markdown in, a styled page out. Also the reference for every feature you can use in a post.
tags: [meta, writing]
cover: /blog/how-this-blog-works/cover.svg
attachments:
  - label: sample-notes.txt
    href: /files/sample-notes.txt
    note: example download
---

Every post on this site is a single Markdown file in the `posts/` directory.
Drop a `.md` file in there, commit, deploy — that's the whole workflow. This
post is itself a file (`posts/how-this-blog-works.md`); read it alongside the
rendered page to see how each feature maps to source.

## The pipeline

At build time, Vite reads every file in `posts/`, pulls the frontmatter off the
top, and hands the body to a Markdown renderer with a stack of plugins for
GitHub-flavoured markdown, math, syntax highlighting, and heading anchors.

![The path from a Markdown file to a rendered post.](/blog/how-this-blog-works/pipeline.svg)

Nothing runs on a server — the output is a static site, so posts load instantly
and there's no database to babysit.

## Frontmatter

The block between the `---` fences at the top is YAML. Every field is optional
except that a title is nice to have:

```yaml
---
title: How this blog works
date: 2026-07-21
description: A short subtitle shown on the post and in the index.
tags: [meta, writing]
cover: /blog/how-this-blog-works/cover.svg
draft: false
attachments:
  - label: sample-notes.txt
    href: /files/sample-notes.txt
    note: example download
---
```

- `date` drives ordering on the [blog index](/blog) — newest first.
- `draft: true` hides a post in production but shows it while you run `npm run dev`.
- `cover` is an image shown under the title.
- Leave `toc: false` to suppress the table of contents on a long post.

## Text, the usual way

You get everything you'd expect from Markdown: **bold**, *italic*, `inline
code`, [links](https://www.gearonixx.dev), and lists.

1. Ordered lists.
2. With more than one item.

- [x] Task lists work too
- [ ] Because they're handy for notes

> Blockquotes render with a soft accent rule down the left — good for pulling
> out a definition or a quote.

## Images and figures

An image on its own line becomes a centered figure. The alt text turns into the
caption; use an empty alt (`![](/path.png)`) if you want the image with no
caption.

```markdown
![This caption appears under the image.](/blog/my-post/diagram.svg)
```

Put image files under `public/`. A file at `public/blog/my-post/diagram.svg` is
served at `/blog/my-post/diagram.svg`. SVGs stay crisp at any size; PNGs and
JPEGs work just as well for screenshots and photos.

## Code

Fenced code blocks get a language label, a copy button, and syntax
highlighting. Just tag the fence with a language:

```python
def attention(q, k, v):
    scores = (q @ k.transpose(-2, -1)) / k.shape[-1] ** 0.5
    weights = scores.softmax(dim=-1)
    return weights @ v
```

```bash
# add a new post and ship it
$EDITOR posts/my-new-post.md
./d "new post: my new post"
```

## Math

Inline math like $O(n^3)$ is written with single dollar signs. Display math uses
double dollars and centers on its own line:

$$
\text{FLOPs}_{\text{matmul}} = 2 \, m \, n \, k
$$

It's rendered with KaTeX, so it's real typeset math, not an image.

## Tables

| Feature      | Markdown            | Rendered as        |
| ------------ | ------------------- | ------------------ |
| Figure       | `![alt](/img.svg)`  | centered + caption |
| Code         | ` ```lang `         | highlighted block  |
| Math         | `$x^2$`             | KaTeX              |
| Attachment   | frontmatter list    | download card      |

## Footnotes

You can add footnotes for asides and citations.[^1] They collect at the bottom
of the post automatically.

## Raw HTML, when you need it

Plain HTML passes through, so you can reach for it in the rare case Markdown
can't express something:

<details>
<summary>Click to expand</summary>

Anything in here is hidden until you open it — useful for long output dumps or
optional detail.

</details>

## Attachments

Files in `public/files/` are downloadable. List them under `attachments:` in the
frontmatter to get the download cards at the end of this post, or just link to
`/files/whatever.pdf` inline. Attach slides, datasets, a proof-of-concept — the
attachment card at the bottom of this page points at a sample text file.

That's the whole system. To write the next post, copy this file, change the
frontmatter, and start typing.

[^1]: Like this one. Footnotes support **markdown** and [links](/blog) too.
