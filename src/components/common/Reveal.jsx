import { useReveal } from '../../hooks/useReveal';

export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ '--d': `${delay}ms` }}>
      {children}
    </div>
  );
}
