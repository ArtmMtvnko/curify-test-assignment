import { Study } from './Study';

export interface LiteStudiesResponse {
  studies: Study[];
  nextPageToken: string;
  totalCount: number;
}

export interface StudiesResponse {
  studies: StudyResponse[];
  nextPageToken: string;
  totalCount: number;
}

interface StudyResponse {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
    };
    conditionsModule: {
      conditions: string[];
    };
  };
}
