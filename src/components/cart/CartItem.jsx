import ProductImage from '../product/ProductImage';
import { useCart } from '../../context/CartContext';
import { money } from '../../lib/format';

export default function CartItem({ item }) {
  const { setQty, remove } = useCart();
  const { product, size, qty, key } = item;
  return (
    <div className="cart-item">
      <ProductImage product={product} className="thumb" />
      <div className="grow">
        <strong>{product.name}</strong>
        <p className="muted small">Size {size}</p>
        <div className="qty">
          <button onClick={() => setQty(key, qty - 1)}>−</button>
          <span>{qty}</span>
          <button onClick={() => setQty(key, qty + 1)}>+</button>
        </div>
      </div>
      <div className="right">
        <strong>{money(product.price * qty)}</strong>
        <button className="link small" onClick={() => remove(key)}>Remove</button>
      </div>
    </div>
  );
}
