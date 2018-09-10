export interface ITerms {
  keywords: string;
  genes: string;
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

export type TQuery = ITerms & Partial<IPage> & Partial<IFilter> & Partial<IRefinement>;
