'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Study } from '@/shared/types/Study';
import { LiteStudiesResponse } from '../types/StudiesResponse';

type FilterProps = {
  setStudies: (studies: Study[]) => void;
  setTotalCount: (count: number) => void;
};

export default function Filter({ setStudies, setTotalCount }: FilterProps) {
  const [cond, setCond] = useState('');
  const [pageSize, setPageSize] = useState(5);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get<LiteStudiesResponse>('api/studies/', {
        params: {
          'query.cond': cond,
          pageSize,
        },
      })
      .then((response) => {
        setStudies(response.data.studies);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
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
      <label>
        Page Size:
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="ml-2 w-24 rounded border px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
        Apply Filter
      </button>
    </form>
  );
}
