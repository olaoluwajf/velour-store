import { Link } from 'react-router-dom';
import Hero3D from './Hero3D';

const STATS = [['30+', 'Styles'], ['4.9★', 'Rating'], ['30d', 'Returns']];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow rise" style={{ '--i': 0 }}>● New season drop</p>
          <h1 className="rise" style={{ '--i': 1 }}>Wear the <span className="grad">future</span> in every thread.</h1>
          <p className="muted rise" style={{ '--i': 2 }}>Bold cuts, premium fabrics and a deep blue edge. Thirty essentials built to stand out.</p>
          <div className="hero-cta rise" style={{ '--i': 3 }}>
            <Link className="btn btn-primary" to="/shop">Shop the collection</Link>
            <Link className="btn btn-ghost" to="/shop?category=Hoodies">Explore hoodies</Link>
          </div>
          <div className="hero-stats rise" style={{ '--i': 4 }}>
            {STATS.map(([v, l]) => <div key={l}><strong>{v}</strong><span className="muted small">{l}</span></div>)}
          </div>
        </div>
        <Hero3D />
      </div>
    </section>
  );
}
