import { IonRange, RangeChangeEventDetail } from '@ionic/react';
import { IonRangeCustomEvent } from '@ionic/core';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setAgeRange } from '../../../store/slices/filtersSlice';
import './AgeRangeFilter.css';

export const AgeRangeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ageRange } = useAppSelector((state) => state.filters);

  const handleRangeChange = (e: IonRangeCustomEvent<RangeChangeEventDetail>) => {
    const value = e.detail.value as { lower: number; upper: number };
    dispatch(setAgeRange(value));
  };

  return (
    <div className="age-range-container">
      <h3 className="age-range-title">
        Age
      </h3>
      <div className="age-range-value">
        {ageRange.lower} – {ageRange.upper}+
      </div>
      <IonRange
        dualKnobs={true}
        min={18}
        max={70}
        value={ageRange}
        onIonChange={handleRangeChange}
        pin={true}
        className="age-range-slider"
      />
    </div>
  );
};

