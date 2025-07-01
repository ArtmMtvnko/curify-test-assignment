'use client';

import React, { useState } from 'react';

type FilterProps = {
  onCondChange: (cond: string) => void;
};

export default function Filter({ onCondChange }: FilterProps) {
  const [cond, setCond] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCondChange(cond);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-2 rounded-lg bg-white p-4 shadow"
    >
      <label className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span>Condition:</span>
        <input
          type="text"
          value={cond}
          onChange={(e) => setCond(e.target.value)}
          placeholder="e.g. diabetes"
          className="rounded border px-2 py-1 sm:ml-2"
        />
      </label>
      <button
        type="submit"
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Apply Filter
      </button>
    </form>
  );
}
