import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ProductFilters from '../components/product/ProductFilters';
import ProductGrid from '../components/product/ProductGrid';
import { useProducts } from '../context/ProductsContext';

export default function Shop() {
  const { products, loading } = useProducts();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(150);
  const category = params.get('category') || 'All';
  const setCategory = (c) => setParams(c === 'All' ? {} : { category: c });

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        p.price <= maxPrice &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    const sorters = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      featured: (a, b) => Number(b.featured) - Number(a.featured),
    };
    return [...list].sort(sorters[sort]);
  }, [products, category, maxPrice, search, sort]);

  return (
    <div className="container section">
      <PageHeader title={category === 'All' ? 'Shop all' : category} subtitle={`${visible.length} products`} />
      <div className="shop">
        <ProductFilters {...{ search, setSearch, category, setCategory, sort, setSort, maxPrice, setMaxPrice }} />
        {loading ? <p className="empty">Loading...</p> : <ProductGrid products={visible} />}
      </div>
    </div>
  );
}
