import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../lib/constants';

export default function CategoryTiles() {
  return (
    <section className="container section">
      <h2>Shop by category</h2>
      <div className="tiles">
        {CATEGORIES.map((c) => (
          <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="tile">{c}<span>→</span></Link>
        ))}
      </div>
    </section>
  );
}
