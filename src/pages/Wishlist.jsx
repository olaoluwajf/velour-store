import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ProductGrid from '../components/product/ProductGrid';
import { useProducts } from '../context/ProductsContext';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { products } = useProducts();
  const { ids } = useWishlist();
  const saved = products.filter((p) => ids.includes(p.id));
  return (
    <div className="container section">
      <PageHeader title="Wishlist" subtitle={`${saved.length} saved items`}>
        {!saved.length && <Link className="btn btn-primary" to="/shop">Browse shop</Link>}
      </PageHeader>
      <ProductGrid products={saved} emptyMessage="Nothing saved yet. Tap the heart on any product." />
    </div>
  );
}
