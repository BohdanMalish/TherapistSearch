import { IonButton } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearFilters } from '../../../store/slices/filtersSlice';
import { selectTotalCount } from '../../../store/slices/specialistsSlice';

interface FiltersActionsProps {
  onApply: () => void;
}

export const FiltersActions: React.FC<FiltersActionsProps> = ({ onApply }) => {
  const dispatch = useAppDispatch();
  const totalCount = useAppSelector(selectTotalCount);

  const handleClearAll = () => {
    dispatch(clearFilters());
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '16px',
      background: 'var(--ion-background-color)',
      borderTop: '1px solid var(--ion-border-color)',
      display: 'flex',
      gap: '12px'
    }}>
      <IonButton
        expand="block"
        fill="outline"
        onClick={handleClearAll}
        style={{ flex: 1 }}
      >
        Clear all
      </IonButton>
      <IonButton
        expand="block"
        onClick={onApply}
        style={{ flex: 2 }}
      >
        Show ({totalCount})
      </IonButton>
    </div>
  );
};

