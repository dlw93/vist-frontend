export interface IMedlineDoc {
    id: string;
    pmid: string;
    score: number;
    classification_score: number;
    title: string;
    abstract: string;
    articleLink: string;
    pubdate: number;
    cancerType: string;
    confidence_is: number;
    journal: string;
    sents: string[];
    mutation_normalizedValue: string[];
    gene_name: string[];
    chemicals: string[];
    mesh_terms: string;
    clinicalRelevance: string;
    clinical_relevance_scale: number;
}

export interface IClinicalTrialDoc {
    condition_name: string;
    intervention_name: string;
    condition_downcase_name: string;
    description: string;
    mutation_normalizedValue: string[];
    intervention_type: string;
    brief_summary: string;
    overall_status: string;
    brief_title: string;
    official_title: string;
    score: number;
    intervention_description: string;
    location: string;
    criteria: string;
    phase: string;
    _version_: number;
    pmid: string[];
    chemicals: string[];
    id: string;
    gene_name: string[];
    nct_id: string;
}

export interface IJournal {
    countValue: number;
    name: string;
    titleName: string;
}

export interface IResponse {
    numFound: number;
    numFoundCT: number;
    maxPublication: number;
    minPublication: number;
    maxPublicationFilter: number;
    minPublicationFilter: number;
    journals: IJournal[];
    docs: IMedlineDoc[];
    ct: IClinicalTrialDoc[];
    queryID: number;
}

export interface IFeedback {
    pmid: string;
    useful: string;
    classification: string;
    queryId: number;
}

export interface IEvalResponse {
    alreadyEvaluated: IFeedback[] | null;
    docs: IMedlineDoc[];
}

export interface IGeneCandidate {
    text: string;
    frequency: number;
    extended_annotations: string[];
    id: string;
    other_designations: string[];
}

export interface ICivic {
    countValue: number;
    name: string;
    titleName: string;
}

export interface IFeedbackResponse {
    feedbackStored?: boolean;
    finishedStored?: boolean;
};

export type TFeedbackResponse = IFeedbackResponse[];

export const enum ErrorCode {
    RESULT_SIZE_EXCEEDS_LIMIT
}

interface IResultSizeExceedsLimitError {
    code: ErrorCode.RESULT_SIZE_EXCEEDS_LIMIT;
    numFound: number;
}

export type IErrorResponse = IResultSizeExceedsLimitError;
