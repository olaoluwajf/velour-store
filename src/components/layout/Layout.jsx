import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import ErrorBoundary from '../common/ErrorBoundary';
import ScrollToTop from '../common/ScrollToTop';

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main><ErrorBoundary><Outlet /></ErrorBoundary></main>
      <Footer />
      <CartDrawer />
    </>
  );
}
