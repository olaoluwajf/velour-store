export default function SectionHeader({ title, subtitle, children }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="muted small">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
