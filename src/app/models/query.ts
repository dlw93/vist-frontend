import { IGeneCandidate } from './response';

export interface IEvalQuery {
  evaluationQueries_id: number;
  evaluationQueries_genes: string;
  evaluationQueries_mutations: string;
  evaluationQueries_cancerType: string;
  evaluationQueries_yearsFrom: number;
  evaluationQueries_yearsTo: number;
  evaluationQueries_publications: string;
}

export interface ITerms {
  keywords: string;
  genes: IGeneCandidate[];
  mutations: string;
}

export interface IPage {
  nrDocuments: number;
  currentPage: number;
}

export interface IFilter {
  cancerType?: string;
  journals?: string[];
  maxYear: number;
  maxFiltered: number;
  minYear: number;
  minFiltered: number;
}

export interface IRefinement {
  queryID: number;
}

export type TQuery = ITerms & Partial<IPage & IFilter & IRefinement>;
