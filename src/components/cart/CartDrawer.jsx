import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { money } from '../../lib/format';

export default function CartDrawer() {
  const { items, subtotal, open, setOpen } = useCart();
  return (
    <>
      <div className={`overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <header className="drawer-head">
          <h3>Your cart</h3>
          <button className="icon-btn" onClick={() => setOpen(false)}>✕</button>
        </header>
        <div className="drawer-body">
          {items.length ? items.map((i) => <CartItem key={i.key} item={i} />) : <p className="empty">Your cart is empty.</p>}
        </div>
        {items.length > 0 && (
          <footer className="drawer-foot">
            <div className="row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <Link className="btn btn-primary block" to="/checkout" onClick={() => setOpen(false)}>Checkout</Link>
          </footer>
        )}
      </aside>
    </>
  );
}
