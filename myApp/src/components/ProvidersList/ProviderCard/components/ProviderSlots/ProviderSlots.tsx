import { IonButton } from '@ionic/react';
import './ProviderSlots.css';

interface ProviderSlotsProps {
  slots: string[];
}

export const ProviderSlots: React.FC<ProviderSlotsProps> = ({ slots }) => {
  return (
    <div className="provider-slots">
      {slots.map((slot, index) => (
        <IonButton
          key={index}
          size="small"
          fill="outline"
          className="slot-button"
        >
          {slot}
        </IonButton>
      ))}
    </div>
  );
};

