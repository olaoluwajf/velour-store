import { useState } from 'react';

// Renders product.image, falling back to an SVG garment tinted with product.color if it is missing or fails to load.
const SHAPES = {
  'T-Shirts': 'M70 22 L18 58 L38 98 L64 85 L64 202 L136 202 L136 85 L162 98 L182 58 L130 22 Q100 44 70 22Z',
  Shirts: 'M70 22 L18 60 L30 150 L64 146 L64 204 L136 204 L136 146 L170 150 L182 60 L130 22 Q100 40 70 22Z',
  Hoodies: 'M62 36 L14 70 L22 170 L62 166 L62 204 L138 204 L138 166 L178 170 L186 70 L138 36 Q100 56 62 36Z',
  Jackets: 'M62 28 L14 66 L20 176 L62 172 L62 206 L138 206 L138 172 L180 176 L186 66 L138 28 Q100 46 62 28Z',
};

const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000 > 150;
};

export default function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (product.image && !failed) {
    return <img className={`pimg ${className}`} src={product.image} alt={product.name} loading="lazy" onError={() => setFailed(true)} />;
  }
  const { category, color = '#1e3a8a' } = product;
  const ink = isLight(color) ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.45)';
  return (
    <div className={`pimg pimg-art ${className}`} role="img" aria-label={product.name}>
      <svg viewBox="0 0 200 224">
        <ellipse cx="100" cy="216" rx="52" ry="5" fill="rgba(0,0,0,.08)" />
        <path d={SHAPES[category] || SHAPES['T-Shirts']} fill={color} stroke={ink} strokeWidth="1.5" strokeLinejoin="round" />
        {category === 'Hoodies' && (
          <>
            <path d="M74 38 Q100 74 126 38" fill="none" stroke={ink} strokeWidth="2" />
            <path d="M72 150 H128 L120 178 H80Z" fill="none" stroke={ink} strokeWidth="1.5" />
          </>
        )}
        {category === 'Shirts' && (
          <>
            <path d="M100 38 V204 M84 24 L100 46 L116 24" fill="none" stroke={ink} strokeWidth="2" />
            {[70, 100, 130, 160].map((y) => <circle key={y} cx="100" cy={y} r="2.2" fill={ink} />)}
          </>
        )}
        {category === 'Jackets' && <path d="M100 40 V206 M86 28 L100 46 L114 28" fill="none" stroke={ink} strokeWidth="2.2" />}
        {category === 'T-Shirts' && <path d="M82 24 Q100 50 118 24" fill="none" stroke={ink} strokeWidth="2" />}
      </svg>
    </div>
  );
}
