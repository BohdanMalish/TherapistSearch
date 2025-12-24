import { IonRange, RangeChangeEventDetail } from '@ionic/react';
import { IonRangeCustomEvent } from '@ionic/core';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setPriceRange } from '../../../store/slices/filtersSlice';
import './PriceRangeFilter.css';

export const PriceRangeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { priceRange } = useAppSelector((state) => state.filters);

  const handleRangeChange = (e: IonRangeCustomEvent<RangeChangeEventDetail>) => {
    const value = e.detail.value as { lower: number; upper: number };
    dispatch(setPriceRange(value));
  };

  return (
    <div className="price-range-container">
      <h3 className="price-range-title">
        Price per session
      </h3>
      <div className="price-range-value">
        {priceRange.lower}₴ – {priceRange.upper}₴
      </div>
      <IonRange
        dualKnobs={true}
        min={0}
        max={3000}
        step={50}
        value={priceRange}
        onIonChange={handleRangeChange}
        pin={true}
        className="price-range-slider"
      />
    </div>
  );
};

