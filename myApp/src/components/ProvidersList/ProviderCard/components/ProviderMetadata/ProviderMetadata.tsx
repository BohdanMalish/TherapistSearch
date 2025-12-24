import './ProviderMetadata.css';
import { IonIcon } from '@ionic/react';
import { briefcaseOutline, peopleOutline } from 'ionicons/icons';

interface ProviderMetadataProps {
  experience: number;
  clients: number;
  sessions: number;
}

export const ProviderMetadata: React.FC<ProviderMetadataProps> = ({
  experience,
  clients,
  sessions
}) => {
  return (
    <div className="provider-metadata">
      <p><IonIcon icon={briefcaseOutline} /> {experience} years of experience</p>
      <p><IonIcon icon={peopleOutline} /> {clients} clients • {sessions} sessions</p>
    </div>
  );
};

