import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IEvalQuery, IResponse, IPage, IFilter, ITerms, IRefinement, TQuery } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private _terms: ITerms;
  private _page: IPage = { currentPage: 0, nrDocuments: 50 };
  private _filter: IFilter;
  private _refinement: IRefinement;

  private _data$ = new ReplaySubject<IResponse>();
  private _loading$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  public get terms(): ITerms {
    return this._terms;
  }

  public set terms(value: ITerms) {
    this._terms = value;
    this._page.currentPage = 0; // we start from the first page in the new query's results
    this._filter = null;        // reset any filters
    this._refinement = null;    // the new query is independent from any preceding queries
    this.send();
  }

  public get page(): IPage {
    return this._page;
  }

  public set page(value: IPage) {
    this._page = value;
    this.send();
  }

  public get filter(): IFilter {
    return this._filter;
  }

  public set filter(value: IFilter) {
    this._filter = value;
    this._page.currentPage = 0; // after applying a new filter, we need to start from the first page again
    this.send();
  }

  public get data$(): Observable<IResponse> {
    return this._data$.asObservable();
  }

  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public getEvalQueries(): Observable<IEvalQuery[]> {
    return this.http.get<IEvalQuery[]>('/assets/examples.json');
  }

  private send() {
    let q: TQuery = Object.assign({}, this._terms, this._page, this._filter, this._refinement);

    console.log(q);

    this._loading$.next(true);
    this.http.get<IResponse>('/assets/response.json', {
      headers: { 'Content-Type': 'application/json' },
      params: <any>q
    }).subscribe(data => {
      data.docs = data.docs.slice(q.currentPage * q.nrDocuments, (q.currentPage + 1) * q.nrDocuments);
      this._refinement = { queryID: data.queryID }; // store the query ID for subsequent refinement queries (paging, filtering)
      this._data$.next(data);
      this._loading$.next(false);
    });
  }
}
