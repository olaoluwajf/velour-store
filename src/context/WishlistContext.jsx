import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('velour_wishlist', []);
  const toggle = (id) => setIds((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  return <WishlistContext.Provider value={{ ids, toggle, has: (id) => ids.includes(id) }}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
