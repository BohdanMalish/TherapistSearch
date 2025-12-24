import { IonButton, IonIcon, IonBadge } from '@ionic/react';
import { funnelOutline, swapVerticalOutline, heartOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { selectActiveFiltersCount } from '../../../store/slices/filtersSlice';
import './StickyFilterBar.css';

export const StickyFilterBar: React.FC = () => {
  const history = useHistory();
  const activeFiltersCount = useAppSelector(selectActiveFiltersCount);

  const isActiveFiltersCountDisplay = !!activeFiltersCount;

  return (
    <div className="sticky-filter-bar">
      <div className="filter-buttons-container">
        <IonButton
          fill="clear"
          color="medium"
          onClick={() => history.push('/filters')}
          className="filter-button"
        >
          <IonIcon icon={funnelOutline} slot="start" />
          {isActiveFiltersCountDisplay && (
            <IonBadge className="filter-badge">
              {activeFiltersCount}
            </IonBadge>
          )}
          Filters
        </IonButton>

        <IonButton fill="clear" color="medium">
          <IonIcon icon={swapVerticalOutline} slot="start" />
          Sort
        </IonButton>

        <IonButton
          fill="clear"
          color="medium"
          className="filter-button"
        >
          <IonIcon icon={heartOutline} slot="start" />
          Favorites
        </IonButton>
      </div>
    </div>
  );
};

