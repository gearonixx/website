const work = [
  {
    text: (
      <>
        Writing database drivers for Yandex infra like{" "}
        <a href="https://t.me/userver_news/95">userver</a>.
      </>
    ),
  },
  {
    text: (
      <>
        Offensive security{" "}
        <a href="https://github.com/ytsaurus/ytsaurus/commit/713a6ff37d66cf76a857291bbbf005a1da800864">
          analysis
        </a>{" "}
        of YTsaurus, Yandex's big-data platform.
      </>
    ),
  },
  {
    text: (
      <>
        In-depth Telegram vulnerability research and hunting elusive{" "}
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
        Working with{" "}
        <a href="https://elliotarledge.com/">Elliot Arledge</a> to create
        single-fused GPU kernel{" "}
        <a href="https://kernelbench.com/hard">benchmarks</a>.
      </>
    ),
  },
];

export default function App() {
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
        <a href="https://t.me/gearonixx">gearonixx</a>
        <a href="mailto:gearonixx@proton.me">gearonixx@proton.me</a>
      </div>
    </div>
  );
}
