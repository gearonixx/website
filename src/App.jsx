const work = [
  {
    text: (
      <>
        Security analysis of <a href="https://ytsaurus.tech/">YTsaurus</a> —
        Yandex's distributed storage and big-data processing platform.
      </>
    ),
  },
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
        Contributing to antiviruses and VPN protocols and clients like{" "}
        <a href="https://github.com/amnezia-vpn/amneziawg-go">Amnezia VPN</a>.
      </>
    ),
  },
  {
    text: (
      <>
        Working with{" "}
        <a href="https://elliotarledge.com/">Elliot Arledge</a> to create{" "}
        <a href="https://t.me/ai_machinelearning_big_data/10250">
          single-fused GPU kernel benchmarks
        </a>
        .
      </>
    ),
  },
  {
    text: (
      <>
        Falling down the <a href="https://ton.org/">TON</a> blockchain rabbit
        hole.
      </>
    ),
  },
];

export default function App() {
  return (
    <div className="container">
      <h1>Egor Uzhanin</h1>

      <div className="bio">
        <p>
          I maintain <a href="https://www.darkbloom.dev/">darkbloom</a> — an
          encrypted, operator-blind AI inference platform.
        </p>
        <p>Also:</p>
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
