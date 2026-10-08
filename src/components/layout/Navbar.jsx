import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth();
  const { count, setOpen } = useCart();
  const { ids } = useWishlist();
  const navigate = useNavigate();

  return (
    <header className="nav-wrap">
      <div className="nav">
        <Link to="/" className="logo">velour<span>.</span></Link>
        <nav className="nav-links">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/wishlist">Wishlist{ids.length > 0 && <em className="count">{ids.length}</em>}</NavLink>
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="muted small hide-sm">Hi, {user.name}</span>
              <button className="btn btn-ghost btn-sm" onClick={async () => { await signOut(); navigate('/'); }}>Sign out</button>
            </>
          ) : (
            <Link className="btn btn-ghost btn-sm" to="/login">Sign in</Link>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>Cart <em className="count light">{count}</em></button>
        </div>
      </div>
    </header>
  );
}
