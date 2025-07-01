import StudyCard from '@/shared/components/StudyCard';
import { Study } from '@/shared/types/Study';

type StudiesPageProps = {
  studies: Study[];
};

export default function StudiesPage({ studies }: StudiesPageProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {studies.map((study) => (
        <StudyCard key={study.nctId} study={study} />
      ))}
    </div>
  );
}
