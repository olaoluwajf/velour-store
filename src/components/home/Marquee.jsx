const WORDS = ['New drop', 'Free shipping over $75', 'Premium fabrics', '30 day returns', 'Limited stock'];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="marquee-row">
            {WORDS.map((w) => <span key={w}>{w} <i>✦</i></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}
