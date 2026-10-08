import ProductImage from '../product/ProductImage';
import { money } from '../../lib/format';

const status = (stock) => (stock === 0 ? ['Out', 'out'] : stock < 10 ? ['Low', 'low'] : ['In stock', 'ok']);

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr><th></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th className="right-col">Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const [label, tone] = status(p.stock);
            return (
              <tr key={p.id}>
                <td><ProductImage product={p} className="thumb sm" /></td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{money(p.price)}</td>
                <td>{p.stock}</td>
                <td><span className={`pill pill-${tone}`}>{label}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="btn btn-sm btn-ghost" onClick={() => onEdit(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger-ghost" onClick={() => onDelete(p)}>Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
