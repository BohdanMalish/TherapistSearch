import { ProviderHeader } from './components/ProviderHeader';
import { ProviderStats } from './components/ProviderStats';
import './ProviderInfo.css';

interface ProviderInfoProps {
  name: string;
  country: string;
  verified: boolean;
  superSpecialist: boolean;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
}

export const ProviderInfo: React.FC<ProviderInfoProps> = ({
  name,
  country,
  verified,
  superSpecialist,
  price,
  duration,
  rating,
  reviews
}) => {
  return (
    <div className="provider-info">
      <ProviderHeader
        name={name}
        country={country}
        verified={verified}
        superSpecialist={superSpecialist}
      />
      <ProviderStats
        price={price}
        duration={duration}
        rating={rating}
        reviews={reviews}
      />
    </div>
  );
};

