import { lazy, Suspense, useEffect } from "react";
import { RouterProvider, useRouter, Link } from "./router.jsx";
import { posts, getPost, formatDate } from "./posts.js";

// The Markdown renderer pulls in react-markdown, KaTeX and highlight.js. Load it
// lazily so it ships only with post pages and never weighs down the home page.
const Markdown = lazy(() => import("./Markdown.jsx"));

const work = [
  {
    text: (
      <>
        writing database drivers for Yandex infra like{" "}
        <a href="https://t.me/userver_news/95">userver</a>.
      </>
    ),
  },
  {
    text: (
      <>
        security{" "}
        <a href="https://github.com/ytsaurus/ytsaurus/commit/713a6ff37d66cf76a857291bbbf005a1da800864">
          analysis
        </a>{" "}
        of <a href="https://ytsaurus.tech/">YTsaurus</a>, Yandex's big-data
        platform.
      </>
    ),
  },
  {
    text: (
      <>
        telegram research and hunting elusive{" "}
        <a href="https://github.com/telegramdesktop/tdesktop/commit/5e1a05f12c11294c87b33cefc874af3086112a75">
          crashes
        </a>
        .
      </>
    ),
  },
  {
    text: (
      <>
        working with <a href="https://elliotarledge.com/">Elliot Arledge</a> to
        create single-fused GPU kernel{" "}
        <a href="https://kernelbench.com/hard">benchmarks</a>.
      </>
    ),
  },
  {
    text: (
      <>
        currently studying the <a href="https://ton.org/">TON</a> blockchain.
      </>
    ),
  },
];

function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

function Home() {
  useTitle("Egor Uzhanin");
  return (
    <div className="container">
      <h1>Egor Uzhanin</h1>

      <div className="bio">
        <ul className="work">
          {work.map((item, i) => (
            <li key={i}>{item.text}</li>
          ))}
        </ul>
      </div>

      <div className="contact">
        <a href="https://t.me/gearonixx">@gearonixx</a>
        <a href="https://x.com/kasper_0q">@kasper_0q</a>
        <a href="mailto:gearonixx@proton.me">gearonixx@proton.me</a>
        <a href="/files/Egor_Uzhanin_CV_EN.pdf">cv</a>
        <Link to="/blog">blog</Link>
        <a href="https://t.me/gearonixx_blog">telegram blog</a>
        <Link to="/proofs">cool findings</Link>
      </div>
    </div>
  );
}

function Proofs() {
  useTitle("Findings — Egor Uzhanin");
  return (
    <div className="container">
      <h1>Findings</h1>
      <p className="update">9 july</p>
      <img className="proof" src="/award.png" alt="telegram research proof" />

      <div className="contact">
        <Link to="/">← back</Link>
        <Link to="/blog">blog</Link>
      </div>
    </div>
  );
}

function BlogIndex() {
  useTitle("Blog — Egor Uzhanin");
  return (
    <div className="container">
      <h1>Blog</h1>

      {posts.length === 0 ? (
        <p className="empty">No posts yet.</p>
      ) : (
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}`} className="post-link">
                <span className="post-date">{formatDate(p.date)}</span>
                <span className="post-title">
                  {p.title}
                  {p.draft && <span className="draft-tag">draft</span>}
                </span>
              </Link>
              {p.description && <p className="post-desc">{p.description}</p>}
            </li>
          ))}
        </ul>
      )}

      <div className="contact">
        <Link to="/">← back</Link>
      </div>
    </div>
  );
}

function Toc({ headings }) {
  const items = (headings || []).filter((h) => h.depth >= 2 && h.depth <= 3);
  if (items.length < 3) return null;
  return (
    <nav className="toc" aria-label="Table of contents">
      <div className="toc-title">Contents</div>
      <ul>
        {items.map((h, i) => (
          <li key={i} className={`toc-depth-${h.depth}`}>
            <a href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Attachments({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="attachments">
      <h2 id="attachments">Attachments</h2>
      <ul>
        {items.map((a, i) => {
          const href = typeof a === "string" ? a : a.href;
          const label =
            typeof a === "string"
              ? a.split("/").pop()
              : a.label || a.href.split("/").pop();
          const meta = typeof a === "object" ? a.note || a.size : "";
          return (
            <li key={i}>
              <a href={href} download className="attachment">
                <span className="attachment-icon" aria-hidden="true">
                  ↓
                </span>
                <span className="attachment-label">{label}</span>
                {meta && <span className="attachment-meta">{meta}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function NotFound() {
  useTitle("Not found — Egor Uzhanin");
  return (
    <div className="container">
      <h1>Not found</h1>
      <p>That page doesn't exist.</p>
      <div className="contact">
        <Link to="/">← home</Link>
        <Link to="/blog">blog</Link>
      </div>
    </div>
  );
}

function Post({ slug }) {
  const post = getPost(slug);
  useTitle(post ? `${post.title} — Egor Uzhanin` : "Not found — Egor Uzhanin");
  if (!post) return <NotFound />;

  return (
    <article className="container article">
      <div className="post-back">
        <Link to="/blog">← blog</Link>
      </div>

      <header className="post-header">
        <h1>{post.title}</h1>
        <div className="post-meta">
          {formatDate(post.date) && <span>{formatDate(post.date)}</span>}
          <span>{post.readingTime} min read</span>
        </div>
        {post.description && <p className="post-subtitle">{post.description}</p>}
      </header>

      {post.cover && (
        <figure className="post-figure post-cover">
          <img src={post.cover} alt="" loading="lazy" />
        </figure>
      )}

      {post.toc && <Toc headings={post.headings} />}

      <div className="post-body">
        <Suspense fallback={<p className="loading">Loading…</p>}>
          <Markdown>{post.content}</Markdown>
        </Suspense>
      </div>

      <Attachments items={post.attachments} />

      <footer className="post-footer">
        <Link to="/blog">← back to blog</Link>
      </footer>
    </article>
  );
}

function Routes() {
  const { path } = useRouter();
  if (path === "/") return <Home />;
  if (path === "/proofs") return <Proofs />;
  if (path === "/blog") return <BlogIndex />;
  if (path.startsWith("/blog/")) {
    return <Post slug={decodeURIComponent(path.slice("/blog/".length))} />;
  }
  return <NotFound />;
}

export default function App() {
  return (
    <RouterProvider>
      <Routes />
    </RouterProvider>
  );
}
