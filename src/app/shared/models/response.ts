export { IMedlineDoc, IJournal, IResponse };

interface IMedlineDoc {
    id: string;
    score: number;
    title: string;
    abstract: string;
    pubdate: number;
    cancerType: string;
    journal: string;
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