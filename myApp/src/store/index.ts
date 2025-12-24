import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';
import specialistsReducer from './slices/specialistsSlice';
import { specialistsApi } from './api/specialistsApi';
import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    specialists: specialistsReducer,
    [specialistsApi.reducerPath]: specialistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(specialistsApi.middleware)
      .concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

