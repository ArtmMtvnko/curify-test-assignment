export interface StudiesResponse {
  studies: StudyResponse[];
  nextPageToken: string;
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
