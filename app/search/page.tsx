'use client';

import Filter from '@/shared/components/Filter';
import StudyCard from '@/shared/components/StudyCard';
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
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {`Studies found: ${totalCount}`}
        {studies.map((study) => (
          <StudyCard key={study.nctId} study={study} />
        ))}
      </div>
    </div>
  );
}
