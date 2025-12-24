import { IonRange, RangeChangeEventDetail } from '@ionic/react';
import { IonRangeCustomEvent } from '@ionic/core';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setPriceRange, selectPriceRange } from '../../../store/slices/filtersSlice';
import { DEFAULT_PRICE_MIN, DEFAULT_PRICE_MAX, PRICE_STEP } from '../../../store/constants';
import './PriceRangeFilter.css';

export const PriceRangeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector(selectPriceRange);

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
        min={DEFAULT_PRICE_MIN}
        max={DEFAULT_PRICE_MAX}
        step={PRICE_STEP}
        value={priceRange}
        onIonChange={handleRangeChange}
        pin={true}
        className="price-range-slider"
      />
    </div>
  );
};

