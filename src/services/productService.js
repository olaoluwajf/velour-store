import { supabase } from '../lib/supabase';
import { seedProducts } from '../data/products';

const KEY = 'velour_products_v2';

const local = {
  read() {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(KEY, JSON.stringify(seedProducts));
    return seedProducts;
  },
  write(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  },
};

export const productService = {
  async list() {
    if (!supabase) return local.read();
    const { data, error } = await supabase.from('products').select('*').order('id');
    if (error) throw error;
    return data;
  },
  async create(product) {
    if (!supabase) {
      const list = local.read();
      const row = { ...product, id: Date.now() };
      local.write([...list, row]);
      return row;
    }
    const { data, error } = await supabase.from('products').insert(product).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, changes) {
    if (!supabase) {
      const list = local.read().map((p) => (p.id === id ? { ...p, ...changes } : p));
      local.write(list);
      return list.find((p) => p.id === id);
    }
    const { data, error } = await supabase.from('products').update(changes).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    if (!supabase) return local.write(local.read().filter((p) => p.id !== id));
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  },
};
