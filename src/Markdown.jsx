// Renders a post's Markdown body. Supports GitHub-flavoured markdown (tables,
// task lists, footnotes, autolinks), LaTeX math via KaTeX, syntax-highlighted
// code, heading anchors, images-as-figures, and inline HTML.

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { useNavigate } from "./router.jsx";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github.css";

// Flatten a hast node back to its plain text (used for the copy-to-clipboard
// button, since the code text is split into highlight spans by the time we see it).
function nodeText(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  return (node.children || []).map(nodeText).join("");
}

function codeLanguage(node) {
  const code = (node?.children || []).find((c) => c.tagName === "code");
  const classes = code?.properties?.className || [];
  const lang = classes.find(
    (c) => typeof c === "string" && c.startsWith("language-"),
  );
  return lang ? lang.slice("language-".length) : "";
}

const FILE_LINK = /\.(pdf|zip|tar|gz|tgz|csv|tsv|json|txt|md|xlsx?|docx?|pptx?|png|jpe?g|gif|svg|webp|mp4|mov|webm|wav|mp3|ico)$/i;

function CopyButton({ getText }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="code-copy"
      aria-label="Copy code to clipboard"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(getText());
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          /* clipboard may be unavailable; ignore */
        }
      }}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}

const components = {
  // Internal links navigate client-side; external links open in a new tab.
  a({ node, href = "", children, ...props }) {
    const navigate = useNavigate();
    const isAnchor = href.startsWith("#");
    const isRoute =
      href.startsWith("/") && !FILE_LINK.test(href) && !href.startsWith("//");
    if (isRoute) {
      return (
        <a
          href={href}
          onClick={(e) => {
            if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
              e.preventDefault();
              navigate(href);
            }
          }}
          {...props}
        >
          {children}
        </a>
      );
    }
    const external = /^https?:\/\//.test(href) || href.startsWith("//");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(isAnchor ? {} : {})}
        {...props}
      >
        {children}
      </a>
    );
  },

  // Render images as <figure> with the alt/title text as a caption. An empty
  // alt (`![](/img.png)`) renders a bare image with no caption.
  img({ node, src, alt = "", title }) {
    const caption = title || alt;
    return (
      <figure className="post-figure">
        <img src={src} alt={alt} title={title || undefined} loading="lazy" />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  },

  // Markdown wraps a lone image in a paragraph, which would nest <figure> inside
  // <p> (invalid). Unwrap image-only paragraphs.
  p({ node, children }) {
    const kids = (node?.children || []).filter(
      (c) => !(c.type === "text" && !String(c.value).trim()),
    );
    if (kids.length === 1 && kids[0].tagName === "img") {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },

  // Wrap code blocks with a language label and a copy button.
  pre({ node, children }) {
    const lang = codeLanguage(node);
    const text = nodeText(node);
    return (
      <div className="code-block">
        <div className="code-bar">
          <span className="code-lang">{lang || "text"}</span>
          <CopyButton getText={() => text} />
        </div>
        <pre>{children}</pre>
      </div>
    );
  },
};

export default function Markdown({ children }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[
        rehypeRaw,
        rehypeSlug,
        rehypeKatex,
        [rehypeHighlight, { detect: true, ignoreMissing: true }],
      ]}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}
