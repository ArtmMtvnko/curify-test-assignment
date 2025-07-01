import { Study } from '@/shared/types/Study';
import { LiteStudiesResponse, StudiesResponse } from '@/shared/types/StudiesResponse';
import axios from 'axios';
import { NextResponse } from 'next/server';

const studiesApiUrl = process.env.STUDIES_API_URL;

export async function GET(request: Request) {
  if (!studiesApiUrl) {
    throw new Error('STUDIES_API_URL environment variable is not defined');
  }

  const params: Record<string, string> = {};

  const { searchParams } = new URL(request.url);

  const queryCond = searchParams.get('query.cond');

  if (queryCond) {
    params['query.cond'] = queryCond;
  }

  params.fields =
    'protocolSection.identificationModule.nctId,protocolSection.identificationModule.briefTitle,protocolSection.conditionsModule.conditions';
  params.countTotal = 'true';
  params.pageSize = '10';

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
