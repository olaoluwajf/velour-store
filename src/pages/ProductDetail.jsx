import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductImage from '../components/product/ProductImage';
import ProductGrid from '../components/product/ProductGrid';
import Stars from '../components/common/Stars';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SIZES } from '../lib/constants';
import { money } from '../lib/format';

export default function ProductDetail() {
  const { id } = useParams();
  const { products, getById } = useProducts();
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const [size, setSize] = useState('M');
  const [qty, setQty] = useState(1);
  const product = getById(id);

  if (!product) return <p className="empty">Product not found. <Link to="/shop">Back to shop</Link></p>;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container section">
      <div className="detail">
        <ProductImage product={product} className="detail-img" />
        <div className="detail-info">
          <p className="muted small">{product.category}</p>
          <h1>{product.name}</h1>
          <Stars rating={product.rating} />
          <p className="price">{money(product.price)}</p>
          <p className="muted">{product.description}</p>
          <h4>Size</h4>
          <div className="row-gap">
            {SIZES.map((s) => <button key={s} className={`chip ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>{s}</button>)}
          </div>
          <h4>Quantity</h4>
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><span>{qty}</span><button onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <p className={`small ${product.stock < 10 ? 'low' : 'muted'}`}>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
          <div className="row-gap">
            <button className="btn btn-primary grow" disabled={!product.stock} onClick={() => add(product, size, qty)}>Add to cart</button>
            <button className="btn btn-ghost" onClick={() => toggle(product.id)}>{has(product.id) ? '♥ Saved' : '♡ Save'}</button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section"><h2>You may also like</h2><ProductGrid products={related} /></section>
      )}
    </div>
  );
}
