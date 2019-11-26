import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IEvalQuery, IResponse, IPage, IFilter, ITerms, IRefinement, TQuery, IGeneCandidate } from '@app/shared';

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
    const url: string = isDevMode() ? '/assets/examples.json' : '/getQueriesExamples';
    return this.http.get<IEvalQuery[]>(url);
  }

  public getGeneCandidates(partial: string, selected: IGeneCandidate[]): Observable<IGeneCandidate[]> {
    const url: string = isDevMode() ? '/assets/geneCandidates.json' : '/getGeneCandidates';
    return this.http.get<IGeneCandidate[]>(url, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        query: partial,
        selected: selected.map(candidate => candidate.id).join(',')
      }
    });
  }

  private send(isRefinement: boolean = false) {
    const url: string = isDevMode() ? '/assets/response.json' : '/getQuery';
    const q: TQuery = Object.assign({}, this._terms, this._page, this._filter, this._refinement);
    const indicator$ = isRefinement ? this._fetching$ : this._loading$;

    // stringify IGeneCandidates
    Object.assign(q, { genes: q.genes.map(gene => gene.extended_annotations.reduce((p, v) => p + ` ${v}`, gene.text)).join(" ") }); // ==> "gene.text ext1 ext2 ..."

    indicator$.next(true);
    if (!isRefinement) {
      this._data$.next(null); // if this is a new query, we invalidate previous data
    }

    q.currentPage++;  // the backend starts counting at 1

    this.http.get<IResponse>(url, {
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
