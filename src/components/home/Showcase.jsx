import { useMemo, useState } from 'react';
import ProductGrid from '../product/ProductGrid';
import SectionHeader from '../common/SectionHeader';
import { useProducts } from '../../context/ProductsContext';

const TABS = [
  { key: 'new', label: 'New in', pick: (l) => [...l].sort((a, b) => b.id - a.id) },
  { key: 'top', label: 'Top rated', pick: (l) => [...l].sort((a, b) => b.rating - a.rating) },
  { key: 'value', label: 'Under $50', pick: (l) => l.filter((p) => p.price < 50) },
];

export default function Showcase() {
  const { products } = useProducts();
  const [tab, setTab] = useState(TABS[0].key);
  const items = useMemo(() => TABS.find((t) => t.key === tab).pick(products).slice(0, 4), [products, tab]);

  return (
    <section className="container section">
      <SectionHeader title="Trending now" subtitle="Fresh picks from the community">
        <div className="tabs">
          {TABS.map((t) => (
            <button key={t.key} className={`tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
      </SectionHeader>
      <ProductGrid key={tab} products={items} />
    </section>
  );
}
