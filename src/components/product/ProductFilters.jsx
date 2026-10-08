import { CATEGORIES, SORTS } from '../../lib/constants';

export default function ProductFilters({ search, setSearch, category, setCategory, sort, setSort, maxPrice, setMaxPrice }) {
  return (
    <aside className="filters">
      <input className="input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <div>
        <h4>Category</h4>
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>
      <div>
        <h4>Max price: ${maxPrice}</h4>
        <input type="range" min="20" max="150" step="5" value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} />
      </div>
      <div>
        <h4>Sort by</h4>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)}>
          {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
    </aside>
  );
}
