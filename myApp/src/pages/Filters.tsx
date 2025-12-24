import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Filters as FiltersContent } from '../components/Filters';

export const Filters: React.FC = () => {
  const history = useHistory();

  const handleApply = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Filters</IonTitle>
        </IonToolbar>
      </IonHeader>

      <FiltersContent onApply={handleApply} />
    </IonPage>
  );
};


