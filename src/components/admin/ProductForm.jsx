import { useState } from 'react';
import { CATEGORIES } from '../../lib/constants';

const EMPTY = { name: '', category: CATEGORIES[0], price: 30, stock: 20, color: '#1e3a8a', description: '', image: '', featured: false, badge: '', rating: 4.5 };

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY, ...initial });
  const set = (k, num) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : num ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [k]: v });
  };

  return (
    <form className="form-grid" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <label>Name<input className="input" value={form.name} onChange={set('name')} required /></label>
      <label>Category
        <select className="input" value={form.category} onChange={set('category')}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>
      <label>Price ($)<input className="input" type="number" min="1" step="0.01" value={form.price} onChange={set('price', true)} required /></label>
      <label>Stock<input className="input" type="number" min="0" value={form.stock} onChange={set('stock', true)} required /></label>
      <label>Color<input className="input color" type="color" value={form.color} onChange={set('color')} /></label>
      <label>Badge
        <select className="input" value={form.badge} onChange={set('badge')}>
          <option value="">None</option><option>New</option><option>Sale</option>
        </select>
      </label>
      <label className="span">Image URL (optional)<input className="input" value={form.image} onChange={set('image')} placeholder="https://..." /></label>
      <label className="span">Description<textarea className="input" rows="3" value={form.description} onChange={set('description')} /></label>
      <label className="check span"><input type="checkbox" checked={form.featured} onChange={set('featured')} /> Featured on homepage</label>
      <div className="span row-gap">
        <button className="btn btn-primary">{initial ? 'Save changes' : 'Add product'}</button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
