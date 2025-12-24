import {
  IonContent,
  IonPage
} from '@ionic/react';
import { Header } from '../components/Header';
import { ProvidersList } from '../components/ProvidersList';

export const SpecialistsList: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <ProvidersList />
      </IonContent>
    </IonPage>
  );
};