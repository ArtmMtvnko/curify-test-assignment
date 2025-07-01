import ApplicationForm from '@/shared/components/ApplicationForm';
import GoBackButton from '@/shared/components/GoBackButton';

type StudyPageProps = {
  params: Promise<{ studyId: string }>;
};

export default async function StudyPage({ params }: StudyPageProps) {
  const { studyId } = await params;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Apply for Study {studyId}</h1>
      <GoBackButton />
      <ApplicationForm studyId={studyId} />
    </div>
  );
}
