import {
  IonList,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSpinner,
  InfiniteScrollCustomEvent
} from '@ionic/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useGetSpecialistsQuery } from '../../store/api/specialistsApi';
import { setTotalCount } from '../../store/slices/specialistsSlice';
import { selectFilters } from '../../store/slices/filtersSlice';
import { DEFAULT_PAGE_SIZE } from '../../store/constants';
import type { Therapist } from '../../store/slices/specialistsSlice';
import { ProviderCard } from './ProviderCard';

export const ProvidersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [allTherapists, setAllTherapists] = useState<Therapist[]>([]);
  const filters = useAppSelector(selectFilters);
  const prevFiltersRef = useRef(filters);

  const queryParams = useMemo(() => ({
    page,
    limit: DEFAULT_PAGE_SIZE,
    priceMin: filters.priceRange.lower,
    priceMax: filters.priceRange.upper,
    ageMin: filters.ageRange.lower,
    ageMax: filters.ageRange.upper,
    ...(filters.gender && { gender: filters.gender }),
  }), [page, filters.priceRange.lower, filters.priceRange.upper, filters.ageRange.lower, filters.ageRange.upper, filters.gender]);

  const { data, isLoading, isFetching } = useGetSpecialistsQuery(queryParams);

  useEffect(() => {
    if (!shallowEqual(prevFiltersRef.current, filters)) {
      setPage(1);
      setAllTherapists([]);
      prevFiltersRef.current = filters;
    }
  }, [filters]);

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllTherapists(data.data);
      } else {
        setAllTherapists((prev) => [...prev, ...data.data]);
      }
      dispatch(setTotalCount(data.total));
    }
  }, [data, dispatch, page]);

  const loadMoreData = (ev: InfiniteScrollCustomEvent) => {
    if (data?.hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
    ev.target.complete();
    if (!data?.hasMore) {
      ev.target.disabled = true;
    };
  };

  if (isLoading && page === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <IonSpinner />
      </div>
    );
  }

  return (
    <>
      <IonList lines="full">
        {allTherapists.map((therapist) => (
          <ProviderCard key={therapist.id} therapist={therapist} />
        ))}
      </IonList>
      <IonInfiniteScroll onIonInfinite={loadMoreData} disabled={!data?.hasMore}>
        <IonInfiniteScrollContent loadingText="Loading more therapists...">
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </>
  );
};

