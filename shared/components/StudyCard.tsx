import React from 'react';
import { Study } from '@/shared/types/Study';
import Link from 'next/link';

type StudyCardProps = {
  study: Study;
};

export default function StudyCard({ study: { title, conditions, nctId } }: StudyCardProps) {
  return (
    <div className="flex max-w-md flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <ul className="list-inside list-disc text-gray-700">
        {conditions.map((condition, idx) => (
          <li key={idx}>{condition}</li>
        ))}
      </ul>
      <div className="text-sm text-gray-500">
        <span className="font-medium">NCT Number:</span> {nctId}
      </div>
      <Link
        href={`/search/${nctId}`}
        className="mt-2 inline-block rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Apply To Trial
      </Link>
    </div>
  );
}

