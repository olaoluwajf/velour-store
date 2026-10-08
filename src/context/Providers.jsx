import { AuthProvider } from './AuthContext';
import { ToastProvider } from './ToastContext';
import { ProductsProvider } from './ProductsContext';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductsProvider>
          <WishlistProvider>
            <CartProvider>{children}</CartProvider>
          </WishlistProvider>
        </ProductsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
