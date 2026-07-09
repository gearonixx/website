import { useEffect, useState } from "react";

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
        working with{" "}
        <a href="https://elliotarledge.com/">Elliot Arledge</a> to create
        single-fused GPU kernel{" "}
        <a href="https://kernelbench.com/hard">benchmarks</a>.
      </>
    ),
  },
];

function Home() {
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
        <a href="mailto:gearonixx@proton.me">gearonixx@proton.me</a>
        <a href="#/proofs">cool findings</a> 
      </div>
    </div>
  );
}

function Proofs() {
  return (
    <div className="container">
      updates
      ----
         --
      <br/>
      <br/>


      <p className="update">9 july</p>
      <img className="proof" src="/award.png" alt="telegram research proof" />

      <div className="contact">
        <a href="#/">← back</a>
      </div>
    </div>
  );
}

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  return hash === "#/proofs" ? <Proofs /> : <Home />;
}
