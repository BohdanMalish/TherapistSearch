import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Therapist } from '../slices/specialistsSlice';
import { Gender } from '../types';

// Standard API response structure
interface ApiResponse<T> {
  status: 'Success' | 'Error';
  data?: T;
  error?: string | string[];
}

// Custom baseQuery with error handling
const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const baseQuery = fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api' 
  });
  const result = await baseQuery(args, api, extraOptions);

  // If response has Error status, create error
  if (result.data && typeof result.data === 'object' && 'status' in result.data) {
    const response = result.data as ApiResponse<unknown>;
    
    if (response.status === 'Error') {
      return {
        error: {
          status: result.meta?.response?.status || 500,
          data: response.error,
        },
      };
    }
  }

  return result;
};

interface GetSpecialistsParams {
  page?: number;
  limit?: number;
  priceMin?: number;
  priceMax?: number;
  ageMin?: number;
  ageMax?: number;
  gender?: Gender;
}

interface GetSpecialistsResponse {
  data: Therapist[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface GetSpecialistsCountResponse {
  totalCount: number;
}

export const specialistsApi = createApi({
  reducerPath: 'specialistsApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Specialist'],
  endpoints: (builder) => ({
    getSpecialists: builder.query<GetSpecialistsResponse, GetSpecialistsParams>({
      query: (params) => ({
        url: '/specialists',
        params,
      }),
      transformResponse: (response: ApiResponse<GetSpecialistsResponse>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Specialist' as const, id })),
              { type: 'Specialist', id: 'LIST' },
            ]
          : [{ type: 'Specialist', id: 'LIST' }],
    }),
    getSpecialistById: builder.query<Therapist, number>({
      query: (id) => `/specialists/${id}`,
      transformResponse: (response: ApiResponse<Therapist>) => response.data,
      providesTags: (result, error, id) => [{ type: 'Specialist', id }],
    }),
    getSpecialistsCount: builder.query<number, GetSpecialistsParams>({
      query: (params) => ({
        url: '/specialists/count',
        params,
      }),
      transformResponse: (response: ApiResponse<GetSpecialistsCountResponse>) => 
        response.data.totalCount,
    }),
    createSpecialist: builder.mutation<Therapist, Omit<Therapist, 'id'>>({
      query: (body) => ({
        url: '/specialists',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<Therapist>) => response.data,
      invalidatesTags: [{ type: 'Specialist', id: 'LIST' }],
    }),
    updateSpecialist: builder.mutation<Therapist, { id: number; updates: Partial<Therapist> }>({
      query: ({ id, updates }) => ({
        url: `/specialists/${id}`,
        method: 'PUT',
        body: updates,
      }),
      transformResponse: (response: ApiResponse<Therapist>) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'Specialist', id },
        { type: 'Specialist', id: 'LIST' },
      ],
    }),
    deleteSpecialist: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/specialists/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<{ message: string }>) => response.data,
      invalidatesTags: (result, error, id) => [
        { type: 'Specialist', id },
        { type: 'Specialist', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetSpecialistsQuery,
  useGetSpecialistByIdQuery,
  useGetSpecialistsCountQuery,
  useLazyGetSpecialistsCountQuery,
  useCreateSpecialistMutation,
  useUpdateSpecialistMutation,
  useDeleteSpecialistMutation,
} = specialistsApi;

