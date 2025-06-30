import { Study } from '@/shared/types/Study';
import { LiteStudiesResponse, StudiesResponse } from '@/shared/types/StudiesResponse';
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
  params.countTotal = 'true';

  // Add default pageSize if not provided
  if (!params.pageSize) {
    params.pageSize = '5';
  }

  console.log('Request params:', params);
  console.log('Request URL:', studiesApiUrl);

  const response = await axios.get<StudiesResponse>(studiesApiUrl, { params });

  const studies = response.data.studies.map<Study>((study) => {
    return {
      nctId: study.protocolSection.identificationModule.nctId,
      title: study.protocolSection.identificationModule.briefTitle,
      conditions: study.protocolSection.conditionsModule.conditions,
    };
  });

  return NextResponse.json<LiteStudiesResponse>({
    studies,
    nextPageToken: response.data.nextPageToken,
    totalCount: response.data.totalCount,
  });
}
