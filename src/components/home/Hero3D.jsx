import ProductImage from '../product/ProductImage';
import { useProducts } from '../../context/ProductsContext';
import { useTilt } from '../../hooks/useTilt';

const PICKS = [12, 22, 19];

export default function Hero3D() {
  const { products } = useProducts();
  const { ref, handlers } = useTilt(18);
  const picks = PICKS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="scene" {...handlers}>
      <div className="stage" ref={ref}>
        <span className="ring" />
        {picks.map((p, i) => (
          <div key={p.id} className={`float-card fc${i}`}>
            <ProductImage product={p} />
            <span>{p.name}</span>
          </div>
        ))}
        <div className="chip3d c1">Free shipping $75+</div>
        <div className="chip3d c2">★ 4.9 rated</div>
      </div>
    </div>
  );
}
