'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex cursor-pointer items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-700"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      Go Back
    </button>
  );
}
