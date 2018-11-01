import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEvalQuery, IEvalResponse, ITerms } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  private _queries: Promise<IEvalQuery[]>;

  constructor(private http: HttpClient) {
  }

  public get queries(): Promise<IEvalQuery[]> {
    const url: string = isDevMode() ? '/assets/evaluationQueries.json' : '/getEvaluationQueries';
    return this._queries || (this._queries = this.http.get<IEvalQuery[]>(url).toPromise());
  }

  public send(terms: ITerms): Promise<IEvalResponse> {
    const url: string = isDevMode() ? '/assets/response.json' : '/getQueryEval';
    return this.http.get<IEvalResponse>(url, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        /*keywords: terms.keywords,
        genes: terms.genes.map(gene => `"${gene.text}"`).join(" "),
        mutations: terms.mutations*/
      }
    }).toPromise();
  }
}
