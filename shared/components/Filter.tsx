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
      <label>
        Condition:
        <input
          type="text"
          value={cond}
          onChange={(e) => setCond(e.target.value)}
          placeholder="Enter condition"
          className="ml-2 rounded border px-2 py-1"
        />
      </label>
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
        Apply Filter
      </button>
    </form>
  );
}
