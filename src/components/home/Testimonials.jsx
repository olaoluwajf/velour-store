import Reveal from '../common/Reveal';
import SectionHeader from '../common/SectionHeader';
import Stars from '../common/Stars';

const REVIEWS = [
  { name: 'Amaka O.', text: 'The hoodie fits perfectly and the fabric feels premium. Delivery was quick too.' },
  { name: 'David K.', text: 'Clean cuts and great quality. The leather jacket is now my everyday piece.' },
  { name: 'Ngozi A.', text: 'Easy returns and the sizing was spot on. Already ordered a second tee.' },
];

export default function Testimonials() {
  return (
    <section className="container section">
      <SectionHeader title="Loved by customers" subtitle="Real words from happy shoppers" />
      <div className="reviews">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 100}>
            <figure className="review">
              <Stars rating="5.0" />
              <blockquote>{r.text}</blockquote>
              <figcaption><span className="avatar">{r.name[0]}</span>{r.name}<span className="muted small">Verified buyer</span></figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
