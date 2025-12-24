import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { Gender } from '../types';
import { 
  DEFAULT_PRICE_MIN, 
  DEFAULT_PRICE_MAX, 
  DEFAULT_AGE_MIN, 
  DEFAULT_AGE_MAX 
} from '../constants';

export interface FiltersState {
  priceRange: {
    lower: number;
    upper: number;
  };
  ageRange: {
    lower: number;
    upper: number;
  };
  gender: Gender | null;
}

const initialState: FiltersState = {
  priceRange: { lower: DEFAULT_PRICE_MIN, upper: DEFAULT_PRICE_MAX },
  ageRange: { lower: DEFAULT_AGE_MIN, upper: DEFAULT_AGE_MAX },
  gender: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPriceRange: (state, action: PayloadAction<{ lower: number; upper: number }>) => {
      state.priceRange = action.payload;
    },
    setAgeRange: (state, action: PayloadAction<{ lower: number; upper: number }>) => {
      state.ageRange = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender | null>) => {
      state.gender = action.payload;
    },
    clearFilters: (state) => {
      state.priceRange = initialState.priceRange;
      state.ageRange = initialState.ageRange;
      state.gender = initialState.gender;
    },
  },
});

export const { setPriceRange, setAgeRange, setGender, clearFilters } = filtersSlice.actions;

// Memoized selectors
const selectFiltersState = (state: { filters: FiltersState }) => state.filters;

export const selectFilters = createSelector(
  [selectFiltersState],
  (filters) => filters
);

export const selectPriceRange = createSelector(
  [selectFiltersState],
  (filters) => filters.priceRange
);

export const selectAgeRange = createSelector(
  [selectFiltersState],
  (filters) => filters.ageRange
);

export const selectGender = createSelector(
  [selectFiltersState],
  (filters) => filters.gender
);

export const selectActiveFiltersCount = createSelector(
  [selectFiltersState],
  (filters) => {
    let count = 0;
    
    if (filters.priceRange.lower !== initialState.priceRange.lower || 
        filters.priceRange.upper !== initialState.priceRange.upper) {
      count++;
    }
    
    if (filters.ageRange.lower !== initialState.ageRange.lower || 
        filters.ageRange.upper !== initialState.ageRange.upper) {
      count++;
    }
    
    if (filters.gender !== initialState.gender) {
      count++;
    }
    
    return count;
  }
);

export default filtersSlice.reducer;

