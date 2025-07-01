import { Applicant } from '@/shared/types/User';
import Link from 'next/link';

const domain = process.env.DOMAIN || 'http://localhost:3000';

async function getApplicants(): Promise<Applicant[]> {
  try {
    const res = await fetch(`${domain}/api/db`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ApplicantsPage() {
  const applicants = await getApplicants();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link
        href="/search"
        className="mb-4 inline-block rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
      >
        To the main page
      </Link>
      <h1 className="mb-6 text-2xl font-bold">Applicants</h1>
      {applicants.length === 0 ? (
        <div className="text-gray-500">No applicants found.</div>
      ) : (
        applicants.map((a) => (
          <div key={a.email} className="mb-6 rounded border bg-white p-4 shadow-sm">
            <div className="mb-1 text-lg font-semibold">
              {a.firstname} {a.lastname}
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <span className="mr-4">NCT ID: {a.nctId}</span>
            </div>
            <div className="mb-2">
              <span className="font-medium">Email:</span> {a.email}
            </div>
            <div className="mb-2">
              <span className="font-medium">Phone:</span> {a.phone}
            </div>
            <div className="rounded bg-gray-50 p-2 text-sm whitespace-pre-line">{a.letter}</div>
          </div>
        ))
      )}
    </div>
  );
}
