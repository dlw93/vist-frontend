import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEvalQuery, IEvalResponse, ICivic, TFeedbackResponse, IFeedback, IFeedbackResponse } from '@app/shared';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  private _queries: Promise<IEvalQuery[]>;
  private _journals: Promise<ICivic[]>;
  private _query$ = new BehaviorSubject<IEvalQuery>(null);
  private _feedback$ = new BehaviorSubject<IFeedback[]>(null);
  private _data$ = new BehaviorSubject<IEvalResponse>(null);

  constructor(private http: HttpClient) { }

  /**
   * All queries the user can choose from for the evaluation.
   */
  public get queries(): Promise<IEvalQuery[]> {
    const url: string = isDevMode() ? '/assets/evaluationQueries.json' : '/getEvaluationQueries';
    return this._queries || (this._queries = this.http.get<IEvalQuery[]>(url).toPromise());
  }

  /**
   * The most recently submitted query.
   */
  public get query$(): Observable<IEvalQuery> {
    return this._query$.asObservable();
  }

  /**
   * The most recently received (partial) feedback response.
   */
  public get feedback$(): Observable<IFeedback[]> {
    return this._feedback$.asObservable();
  }

  /**
   * The most recently received query response.
   */
  public get data$(): Observable<IEvalResponse> {
    return this._data$.asObservable();
  }

  /**
   * Submits a query to the server.
   * @param q The query to submit
   */
  public async sendQuery(q: IEvalQuery): Promise<void> {
    const url: string = isDevMode() ? '/assets/evalResponse.json' : '/getQueryEval';
    return this.http.get<IEvalResponse>(url, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        cancerType: q.evaluationQueries_cancerType,
        currentPage: "1",
        genes: q.evaluationQueries_genes,
        journals: (await this.journals).map(civic => civic.name),
        maxFiltered: q.evaluationQueries_yearsTo.toString(),
        maxYear: q.evaluationQueries_yearsTo.toString(),
        minFiltered: q.evaluationQueries_yearsFrom.toString(),
        minYear: q.evaluationQueries_yearsFrom.toString(),
        mutations: q.evaluationQueries_mutations.toString(),
        nrDocuments: "100",
        queryID: q.evaluationQueries_id.toString()
      }
    }).toPromise().then(response => {
      this._query$.next(q);
      this._feedback$.next(response ? response.alreadyEvaluated || [] : []);
      this._data$.next(response);
    });
  }

  /**
   * Submits user feedback to the server.
   * @param feedback The array of feedback entries
   * @param partial Whether the query's entire result was only partially evaluated or not
   * @returns Whether the feedback data was successfully stored on the server
   */
  public async sendFeedback(feedback: IFeedback[], partial: boolean): Promise<boolean> {
    const url: string = isDevMode() ? '/assets/feedbackEval.json' : '/feedbackEval';
    return this.http.get<TFeedbackResponse>(url, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        feedbackData: feedback.map(item => JSON.stringify(item)),
        feedbackType: partial ? "1" : "0"
      }
    }).toPromise().then(response => {
      let r: IFeedbackResponse = Object.assign({}, ...response);  // we convert the somewhat strange response from the server to a single object
      let success = ('finishedStored' in r && r.finishedStored) || ('feedbackStored' in r && r.feedbackStored); // whether the feedback data was successfully stored on the server
      if (success) {
        this._feedback$.next(feedback); // store the feedback locally to preserve it on navigation
      }
      return success;
    });
  }

  private get journals(): Promise<ICivic[]> {
    const url: string = isDevMode() ? '/assets/civicEval.json' : '/getCivicEval';
    return this._journals || (this._journals = this.http.get<ICivic[]>(url).toPromise());
  }
}
