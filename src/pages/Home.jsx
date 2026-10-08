import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import Perks from '../components/home/Perks';
import CategoryTiles from '../components/home/CategoryTiles';
import Showcase from '../components/home/Showcase';
import PromoBanner from '../components/home/PromoBanner';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import ProductGrid from '../components/product/ProductGrid';
import SectionHeader from '../components/common/SectionHeader';
import { useProducts } from '../context/ProductsContext';

export default function Home() {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      <Hero />
      <Marquee />
      <Perks />
      <CategoryTiles />
      <Showcase />
      <PromoBanner />
      <section className="container section">
        <SectionHeader title="Featured picks" subtitle="Hand selected by our team">
          <Link to="/shop" className="link">View all →</Link>
        </SectionHeader>
        <ProductGrid products={featured} />
      </section>
      <Testimonials />
      <Newsletter />
    </>
  );
}
