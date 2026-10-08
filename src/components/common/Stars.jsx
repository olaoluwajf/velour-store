export default function Stars({ rating }) {
  return <span className="stars" aria-label={`${rating} out of 5`}>★ {rating}</span>;
}
