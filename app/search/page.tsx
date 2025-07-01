'use client';

import { useState } from 'react';
import Filter from '@/shared/components/Filter';
import Studies from './(studies)/page';
import { useStudies } from '@/shared/hooks/useStudies';
import GoUpButton from '@/shared/components/GoUpButton';

export default function SearchPage() {
  const [cond, setCond] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useStudies(cond);

  const studies = data?.pages.flatMap((page) => page.studies) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <GoUpButton />

      <Filter onCondChange={setCond} />
      <p>
        Studies found: <b>{totalCount}</b>
      </p>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading studies</p>}

      <Studies studies={studies} />

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
