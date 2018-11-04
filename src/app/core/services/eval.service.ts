import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEvalQuery, IEvalResponse, ICivic, TFeedbackResponse, IFeedback } from '@app/shared';
import { BehaviorSubject, Observable } from 'rxjs';

type TStrVal<T, V> = {
  [P in keyof T]: V;
}

@Injectable({
  providedIn: 'root'
})
export class EvalService {
  private _queries: Promise<IEvalQuery[]>;
  private _journals: Promise<ICivic[]>;
  private _query$ = new BehaviorSubject<IEvalQuery>(null);
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
   * The most recently received query response.
   */
  public get data$(): Observable<IEvalResponse> {
    return this._data$.asObservable();
  }

  /**
   * The most recently submitted query.
   */
  public get query$(): Observable<IEvalQuery> {
    return this._query$.asObservable();
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
      this._data$.next(response);
    });
  }

  /**
   * Submits user feedback to the server.
   * @param feedback The array of feedback entries
   * @param partial Whether the query's entire result was only partially evaluated or not
   */
  public async sendFeedback(feedback: IFeedback[], partial: boolean): Promise<TFeedbackResponse> {
    const url: string = isDevMode() ? '/assets/feedbackEval.json' : '/feedbackEval';
    return this.http.get<TFeedbackResponse>(url, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        feedbackData: feedback.map(item => JSON.stringify(item)),
        feedbackType: partial ? "1" : "0"
      }
    }).toPromise();
  }

  private get journals(): Promise<ICivic[]> {
    const url: string = isDevMode() ? '/assets/civicEval.json' : '/getCivicEval';
    return this._journals || (this._journals = this.http.get<ICivic[]>(url).toPromise());
  }

  /**
   * Converts a given object's values to string.
   * @param obj The object to convert
   */
  private _stringifyValues<T>(obj: T): TStrVal<T, string> {
    return Object.assign({}, ...Object.entries(obj).map(kv => ({ [kv[0]]: kv[1].toString() })));
  }
}
