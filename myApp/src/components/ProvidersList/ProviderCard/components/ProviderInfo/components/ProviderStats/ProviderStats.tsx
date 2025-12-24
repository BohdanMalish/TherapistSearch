import './ProviderStats.css';

interface ProviderStatsProps {
  price: number;
  duration: number;
  rating: number;
  reviews: number;
}

export const ProviderStats: React.FC<ProviderStatsProps> = ({
  price,
  duration,
  rating,
  reviews
}) => {
  return (
    <div className="provider-stats">
      <div>
        <strong className="stat-price">${price} USD</strong>
        <div className="stat-secondary">{duration} min</div>
      </div>
      <div>
        <strong>⭐ {rating}</strong>
        <div className="stat-secondary">
          {reviews.toLocaleString()} reviews
        </div>
      </div>
    </div>
  );
};

