import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { money } from '../lib/format';

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const [done, setDone] = useState(false);
  const shipping = subtotal > 75 || !subtotal ? 0 : 6;

  // TODO: insert the order into a Supabase `orders` table and hook up a payment provider here.
  const placeOrder = (e) => {
    e.preventDefault();
    clear();
    setDone(true);
  };

  if (done) {
    return (
      <div className="container section center">
        <h1>Thank you!</h1>
        <p className="muted">Your order has been placed (demo).</p>
        <Link className="btn btn-primary" to="/shop">Keep shopping</Link>
      </div>
    );
  }
  if (!items.length) return <p className="empty">Your cart is empty. <Link to="/shop">Shop now</Link></p>;

  return (
    <div className="container section">
      <PageHeader title="Checkout" subtitle="Review your order and enter shipping details" />
      <div className="checkout">
      <form className="panel" onSubmit={placeOrder}>
        <h2>Shipping details</h2>
        <input className="input" placeholder="Full name" defaultValue={user?.name} required />
        <input className="input" placeholder="Address" required />
        <div className="row-gap"><input className="input" placeholder="City" required /><input className="input" placeholder="Postal code" required /></div>
        <button className="btn btn-primary block">Place order · {money(subtotal + shipping)}</button>
      </form>
      <div className="panel">
        <h2>Summary</h2>
        {items.map((i) => <div key={i.key} className="row"><span>{i.product.name} ({i.size}) × {i.qty}</span><span>{money(i.product.price * i.qty)}</span></div>)}
        <hr />
        <div className="row"><span>Shipping</span><span>{shipping ? money(shipping) : 'Free'}</span></div>
        <div className="row"><strong>Total</strong><strong>{money(subtotal + shipping)}</strong></div>
      </div>
      </div>
    </div>
  );
}
