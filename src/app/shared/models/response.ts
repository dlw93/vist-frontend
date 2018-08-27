export { IMedlineDoc, IJournal, IResponse };

interface IMedlineDoc {
    id: string;
    score: number;
    classification_score: number;
    title: string;
    abstract: string;
    pubdate: number;
    cancerType: string;
    confidence_is: number;
    journal: string;
    gene_name: string[];
    mesh_terms: string[];
    clinicalRelevance: string;
    clinical_relevance_scale: number;
}

interface IJournal {
    countValue: number;
    name: string;
    titleName: string;
}

interface IResponse {
    numFound: number;
    numFoundCT: number;
    maxPublication: number;
    minPublication: number;
    maxPublicationFilter: number;
    minPublicationFilter: number;
    journals: IJournal[];
    docs: IMedlineDoc[];
    ct: any[];
    queryID: number;
}
