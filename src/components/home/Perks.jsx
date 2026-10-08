const PERKS = [
  ['Free shipping', 'On orders over $75'],
  ['Easy returns', '30 day no-questions returns'],
  ['Secure checkout', 'Encrypted and protected'],
];

export default function Perks() {
  return (
    <section className="container perks">
      {PERKS.map(([t, d]) => (
        <div key={t}><strong>{t}</strong><p className="muted small">{d}</p></div>
      ))}
    </section>
  );
}
