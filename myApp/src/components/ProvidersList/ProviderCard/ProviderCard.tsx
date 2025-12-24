import type { Therapist } from '../../../store/slices/specialistsSlice';
import {
  ProviderImage,
  ProviderInfo,
  ProviderDescription,
  ProviderMetadata,
  ProviderSlots
} from './components';
import './ProviderCard.css';

interface ProviderCardProps {
  therapist: Therapist;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ therapist }) => {
  return (
    <div className="provider-card">
      <div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <ProviderImage 
            src={therapist.image} 
            alt={therapist.name} 
          />
          <ProviderInfo
            name={therapist.name}
            country={therapist.country}
            verified={therapist.verified}
            superSpecialist={therapist.superSpecialist}
            price={therapist.price}
            duration={therapist.duration}
            rating={therapist.rating}
            reviews={therapist.reviews}
          />
        </div>
        <>
          <ProviderDescription description={therapist.description} />
          <ProviderMetadata
            experience={therapist.experience}
            clients={therapist.clients}
            sessions={therapist.sessions}
          />
          <ProviderSlots slots={therapist.availableSlots} />
        </>
      </div>
    </div>
  );
};

