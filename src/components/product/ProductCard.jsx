import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import Stars from '../common/Stars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTilt } from '../../hooks/useTilt';
import { money } from '../../lib/format';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const liked = has(product.id);
  const { ref, handlers } = useTilt(9);

  return (
    <article className="card" ref={ref} {...handlers}>
      <div className="card-media">
        <Link to={`/product/${product.id}`}><ProductImage product={product} /></Link>
        {product.badge && <span className={`badge badge-${product.badge.toLowerCase()}`}>{product.badge}</span>}
        <button className={`heart ${liked ? 'on' : ''}`} onClick={() => toggle(product.id)} aria-label="Toggle wishlist">
          {liked ? '♥' : '♡'}
        </button>
        <button className="quick-add" onClick={() => add(product, 'M')}>Quick add</button>
      </div>
      <div className="card-body">
        <div>
          <Link to={`/product/${product.id}`} className="card-title">{product.name}</Link>
          <p className="muted small">{product.category}</p>
        </div>
        <div className="right">
          <strong>{money(product.price)}</strong>
          <Stars rating={product.rating} />
        </div>
      </div>
    </article>
  );
}
