import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Therapist {
  id: number;
  name: string;
  country: string;
  verified: boolean;
  superSpecialist: boolean;
  price: number;
  rating: number;
  reviews: number;
  duration: number;
  description: string;
  experience: number;
  clients: number;
  sessions: number;
  image: string;
  availableSlots: string[];
  isFavorite: boolean;
  age?: number;
  gender?: 'man' | 'woman';
}

export interface SpecialistsState {
  specialists: Therapist[];
  totalCount: number;
  loading: boolean;
  hasMore: boolean;
}

const initialState: SpecialistsState = {
  specialists: [],
  totalCount: 0,
  loading: false,
  hasMore: true,
};

export const specialistsSlice = createSlice({
  name: 'specialists',
  initialState,
  reducers: {
    setSpecialists: (state, action: PayloadAction<Therapist[]>) => {
      state.specialists = action.payload;
    },
    addSpecialists: (state, action: PayloadAction<Therapist[]>) => {
      state.specialists.push(...action.payload);
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setSpecialists, addSpecialists, setTotalCount, setLoading, setHasMore } = specialistsSlice.actions;

// Selectors
export const selectAllSpecialists = (state: { specialists: SpecialistsState }) => 
  state.specialists.specialists;

export const selectTotalCount = (state: { specialists: SpecialistsState }) => 
  state.specialists.totalCount;

export const selectSpecialistsLoading = (state: { specialists: SpecialistsState }) => 
  state.specialists.loading;

export const selectHasMore = (state: { specialists: SpecialistsState }) => 
  state.specialists.hasMore;

export default specialistsSlice.reducer;

