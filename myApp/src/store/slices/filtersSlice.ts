import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export const selectActiveFiltersCount = (state: { filters: FiltersState }) => {
  let count = 0;
  
  if (state.filters.priceRange.lower !== initialState.priceRange.lower || 
      state.filters.priceRange.upper !== initialState.priceRange.upper) {
    count++;
  }
  
  if (state.filters.ageRange.lower !== initialState.ageRange.lower || 
      state.filters.ageRange.upper !== initialState.ageRange.upper) {
    count++;
  }
  
  if (state.filters.gender !== initialState.gender) {
    count++;
  }
  
  return count;
};

export default filtersSlice.reducer;

