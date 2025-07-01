import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LiteStudiesResponse } from '../types/StudiesResponse';

export function useStudies(cond: string) {
  return useInfiniteQuery({
    queryKey: ['studies', cond],
    queryFn: async ({ pageParam = '' }) => {
      const params: Record<string, string> = {};

      if (cond) params['query.cond'] = cond;
      if (pageParam) params['pageToken'] = pageParam;

      const res = await axios.get<LiteStudiesResponse>('/api/studies', { params });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    initialPageParam: '',
  });
}
