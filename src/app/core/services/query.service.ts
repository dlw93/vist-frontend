import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IEvalQuery, IResponse, IPage, IFilter, ITerms, IRefinement, TQuery } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private _terms: ITerms;
  private _page: IPage = { currentPage: 0, nrDocuments: 50 };
  private _filter: IFilter;
  private _refinement: IRefinement;

  private _data$ = new BehaviorSubject<IResponse>(null);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _fetching$ = new BehaviorSubject<boolean>(false);

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
    this.send(true);
  }

  public get filter(): IFilter {
    return this._filter;
  }

  public set filter(value: IFilter) {
    this._filter = value;
    this._page.currentPage = 0; // after applying a new filter, we need to start from the first page again
    this.send(true);
  }

  public get data$(): Observable<IResponse> {
    return this._data$.asObservable();
  }

  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public get fetching$(): Observable<boolean> {
    return this._fetching$.asObservable();
  }

  public getEvalQueries(): Observable<IEvalQuery[]> {
    //return this.http.get<IEvalQuery[]>('/assets/examples.json');
    return this.http.get<IEvalQuery[]>('/getQueriesExamples');
  }

  private send(isRefinement: boolean = false) {
    const q: TQuery = Object.assign({}, this._terms, this._page, this._filter, this._refinement);
    const indicator$ = isRefinement ? this._fetching$ : this._loading$;

    indicator$.next(true);
    if (!isRefinement) {
      this._data$.next(null); // if this is a new query, we invalidate previous data
    }

    q.currentPage++;  // the backend starts counting at 1

    //this.http.get<IResponse>('/assets/response.json', {
    this.http.get<IResponse>('/getQuery', {
      headers: { 'Content-Type': 'application/json' },
      params: <any>q
    }).subscribe(data => {
      this._filter = Object.assign(this._filter || {}, {
        maxYear: data.maxPublication,
        minYear: data.minPublication,
        maxFiltered: data.maxPublicationFilter,
        minFiltered: data.minPublicationFilter
      });
      this._refinement = { queryID: data.queryID }; // store the query ID for subsequent refinement queries (paging, filtering)

      this._data$.next(data);
      indicator$.next(false);
    });
  }
}
