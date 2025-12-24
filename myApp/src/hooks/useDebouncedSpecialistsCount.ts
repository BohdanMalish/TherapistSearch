import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../store/hooks';
import { useLazyGetSpecialistsCountQuery } from '../store/api/specialistsApi';
import { setTotalCount } from '../store/slices/specialistsSlice';
import { COUNT_DEBOUNCE_DELAY } from '../store/constants';
import { FiltersState } from '../store/slices/filtersSlice';

export const useDebouncedSpecialistsCount = (filters: FiltersState, delay: number = COUNT_DEBOUNCE_DELAY) => {
  const dispatch = useAppDispatch();
  const [triggerGetCount] = useLazyGetSpecialistsCountQuery();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      const currentRequestId = ++requestIdRef.current;

      try {
        const result = await triggerGetCount({
          priceMin: filters.priceRange.lower,
          priceMax: filters.priceRange.upper,
          ageMin: filters.ageRange.lower,
          ageMax: filters.ageRange.upper,
          ...(filters.gender && { gender: filters.gender }),
        }).unwrap();

        // Update only if this is the most recent request
        if (currentRequestId === requestIdRef.current) {
          dispatch(setTotalCount(result));
        }
      } catch (error) {
        console.error('Failed to fetch specialists count:', error);
      }
    }, delay);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [filters, triggerGetCount, dispatch, delay]);
};

