import { createContext, useContext, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage('velour_cart', []); // { key, product, size, qty }
  const [open, setOpen] = useState(false);
  const toast = useToast();

  const api = useMemo(() => {
    const add = (product, size = 'M', qty = 1) => {
      const key = `${product.id}-${size}`;
      setItems((list) =>
        list.some((i) => i.key === key)
          ? list.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
          : [...list, { key, product, size, qty }]
      );
      toast(`${product.name} added to cart`);
      setOpen(true);
    };
    const setQty = (key, qty) =>
      setItems((list) => list.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));
    const remove = (key) => setItems((list) => list.filter((i) => i.key !== key));
    const clear = () => setItems([]);
    return { add, setQty, remove, clear };
  }, [setItems, toast]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.product.price, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, open, setOpen, ...api }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
