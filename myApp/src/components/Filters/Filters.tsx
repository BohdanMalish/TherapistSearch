import { IonContent } from '@ionic/react';
import { PriceRangeFilter } from './PriceRangeFilter';
import { GenderFilter } from './GenderFilter';
import { AgeRangeFilter } from './AgeRangeFilter';
import { FiltersActions } from './FiltersActions';
import { useAppSelector } from '../../store/hooks';
import { selectFilters } from '../../store/slices/filtersSlice';
import { useDebouncedSpecialistsCount } from '../../hooks';

interface FiltersProps {
  onApply: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ onApply }) => {
  const filters = useAppSelector(selectFilters);
  
  useDebouncedSpecialistsCount(filters);

  return (
    <IonContent className="ion-padding">
      <PriceRangeFilter />
      <GenderFilter />
      <AgeRangeFilter />
      <FiltersActions onApply={onApply} />
    </IonContent>
  );
};

