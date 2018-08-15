import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Query } from './query';
import { Observable } from 'rxjs';

export interface IEvalQuery {
  evaluationQueries_yearsFrom: number;
  evaluationQueries_id: number;
  evaluationQueries_yearsTo: number;
  evaluationQueries_mutations: string;
  evaluationQueries_genes: string;
  evaluationQueries_cancerType: string;
  evaluationQueries_publications: string;
}

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private _evalQueries: IEvalQuery[];

  constructor(private http: HttpClient) {
    this.http.get<IEvalQuery[]>('/assets/examples.json').subscribe(data => this._evalQueries = data);
  }

  public get evalQueries(): IEvalQuery[] {
    return this._evalQueries;
  }

  public sendQuery(q: Query): Observable<object> {
    /*return this.http.get('https://127.0.0.1:5002/getQuery', {
      headers: { 'Content-Type': 'application/json' },
      params: {
        'keywords': q.keywords,
        'genes': q.genes,
        'mutations': q.mutations
      }
    });*/
    return this.http.get('/assets/response.json');
  }
}
