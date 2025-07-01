'use client';

import Filter from '@/shared/components/Filter';
import Studies from './(studies)/page';
import { LiteStudiesResponse } from '@/shared/types/StudiesResponse';
import { Study } from '@/shared/types/Study';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const response = axios.get<LiteStudiesResponse>('/api/studies');
    response
      .then((res) => res.data)
      .then((data) => {
        setStudies(data.studies);
        setTotalCount(data.totalCount);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Filter setStudies={setStudies} setTotalCount={setTotalCount} />
      <p>{`Studies found: ${totalCount}`}</p>
      <Studies studies={studies} />
    </div>
  );
}
