import { money } from '../../lib/format';

export default function StatsCards({ products }) {
  const stats = [
    ['Products', products.length],
    ['Inventory value', money(products.reduce((s, p) => s + p.price * p.stock, 0))],
    ['Low stock (<10)', products.filter((p) => p.stock < 10).length],
    ['Featured', products.filter((p) => p.featured).length],
  ];
  return (
    <div className="stats">
      {stats.map(([label, value]) => (
        <div key={label} className="stat"><p className="muted small">{label}</p><strong>{value}</strong></div>
      ))}
    </div>
  );
}
