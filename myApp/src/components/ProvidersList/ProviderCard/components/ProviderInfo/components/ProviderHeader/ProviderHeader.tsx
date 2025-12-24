import { IonIcon } from '@ionic/react';
import { checkmarkCircle, trophy } from 'ionicons/icons';
import './ProviderHeader.css';

interface ProviderHeaderProps {
  name: string;
  country: string;
  verified: boolean;
  superSpecialist: boolean;
}

export const ProviderHeader: React.FC<ProviderHeaderProps> = ({
  name,
  country,
  verified,
  superSpecialist
}) => {
  return (
    <div className="provider-header">
      <div>
        <h2 className="provider-name">
          {name} {country} {verified && <IonIcon icon={checkmarkCircle} color="success" />}
        </h2>
        {superSpecialist && (
          <div className="super-specialist-badge">
            <IonIcon icon={trophy} /> Super Specialist
          </div>
        )}
      </div>
    </div>
  );
};

