import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo">velour<span>.</span></Link>
          <p className="muted small">Modern clothing, made to be worn daily.</p>
        </div>
        <div>
          <h4>Shop</h4>
          {CATEGORIES.map((c) => <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`}>{c}</Link>)}
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Sign in</Link>
          <Link to="/signup">Create account</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>
        <div>
          <h4>Support</h4>
          <span className="muted small">Free shipping over $75</span>
          <span className="muted small">30 day returns</span>
          <span className="muted small">hello@velour.store</span>
        </div>
      </div>
      <p className="muted small center">© {new Date().getFullYear()} Velour. Product photos from Unsplash.</p>
    </footer>
  );
}
