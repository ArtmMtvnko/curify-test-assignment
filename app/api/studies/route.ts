import { Study } from '@/shared/types/Study';
import { StudiesResponse } from '@/shared/types/StudyResponsePart';
import axios from 'axios';
import { NextResponse } from 'next/server';

const studiesApiUrl = process.env.STUDIES_API_URL;

export async function GET(request: Request) {
  if (!studiesApiUrl) {
    throw new Error('STUDIES_API_URL environment variable is not defined');
  }

  // Parse URL params from the request
  const { searchParams } = new URL(request.url);

  // Convert searchParams to a plain object
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  params.fields =
    'protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions';

  // Add default pageSize if not provided
  if (!params.pageSize) {
    params.pageSize = '5';
  }

  const response = await axios.get<StudiesResponse>(studiesApiUrl, { params });

  console.log(response.data);

  const studies = response.data.studies.map<Study>((study) => {
    return {
      nctId: study.protocolSection.identificationModule.nctId,
      title: study.protocolSection.identificationModule.briefTitle,
      conditions: study.protocolSection.conditionsModule.conditions,
    };
  });

  return NextResponse.json(studies);
}
