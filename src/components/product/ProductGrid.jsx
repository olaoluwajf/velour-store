import ProductCard from './ProductCard';
import Reveal from '../common/Reveal';

export default function ProductGrid({ products, emptyMessage = 'No products match your filters.' }) {
  if (!products.length) return <p className="empty">{emptyMessage}</p>;
  return (
    <div className="grid">
      {products.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 90}><ProductCard product={p} /></Reveal>
      ))}
    </div>
  );
}
