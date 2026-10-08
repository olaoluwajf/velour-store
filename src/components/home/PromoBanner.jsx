import { Link } from 'react-router-dom';
import ProductImage from '../product/ProductImage';
import { useProducts } from '../../context/ProductsContext';
import { useTilt } from '../../hooks/useTilt';

const PICKS = [19, 21, 22];

export default function PromoBanner() {
  const { products } = useProducts();
  const { ref, handlers } = useTilt(8);
  const picks = PICKS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="container section">
      <div className="promo">
        <div className="promo-copy">
          <p className="eyebrow">Outerwear season</p>
          <h2>Layer up with our new jackets.</h2>
          <p className="muted">Leather, denim, puffers and bombers. Built for cooler days and long nights.</p>
          <Link className="btn btn-primary" to="/shop?category=Jackets">Shop jackets</Link>
        </div>
        <div className="promo-art" ref={ref} {...handlers}>
          {picks.map((p, i) => <ProductImage key={p.id} product={p} className={`promo-img pi${i}`} />)}
        </div>
      </div>
    </section>
  );
}
