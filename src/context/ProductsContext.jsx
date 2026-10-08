import { createContext, useContext, useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { useToast } from './ToastContext';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    productService.list().then(setProducts).catch((e) => toast(e.message)).finally(() => setLoading(false));
  }, [toast]);

  const run = async (fn, message) => {
    try {
      await fn();
      toast(message);
    } catch (e) {
      toast(e.message);
    }
  };

  const value = {
    products,
    loading,
    getById: (id) => products.find((p) => String(p.id) === String(id)),
    addProduct: (p) =>
      run(async () => {
        const row = await productService.create(p);
        setProducts((l) => [...l, row]);
      }, 'Product added'),
    updateProduct: (id, c) =>
      run(async () => {
        const row = await productService.update(id, c);
        setProducts((l) => l.map((p) => (p.id === id ? row : p)));
      }, 'Product updated'),
    deleteProduct: (id) =>
      run(async () => {
        await productService.remove(id);
        setProducts((l) => l.filter((p) => p.id !== id));
      }, 'Product deleted'),
  };
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);
