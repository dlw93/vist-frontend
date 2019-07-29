import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatTabChangeEvent } from '@angular/material';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { QueryService, VIST_SLIDE_IN_ANIMATION, HighlightingService, TitleService, VistHeader } from '@app/core';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
  animations: [VIST_SLIDE_IN_ANIMATION]
})
export class QueryComponent {
  isSmall: Observable<boolean>;
  isLoading: Observable<boolean>;
  hasData: Observable<boolean>;
  isSidenavEnabled: Observable<boolean>;
  hasMedlineData: boolean;
  hasCTData: boolean;
  selectedTabIndex: number;

  @ViewChild(VistHeader, { read: ElementRef, static: true }) header: ElementRef;
  @ViewChild(MatSidenav, { static: false }) sidenav: MatSidenav;

  constructor(
    queryService: QueryService,
    breakpointObserver: BreakpointObserver,
    private titleService: TitleService,
    private highlightingService: HighlightingService) {
    titleService.title = "Query Results";

    this.isSmall = breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium]).pipe(map(state => state.matches));
    this.isLoading = queryService.loading$;
    this.hasData = queryService.data$.pipe(
      tap(data => this.hasMedlineData = data ? data.docs.length > 0 : false),
      tap(data => this.hasCTData = data ? data.ct.length > 0 : false),
      tap(data => this.selectedTabIndex = data ? 1 - Math.sign(data.numFound) : 0),  // if there are no Medline results, switch to second tab
      map(data => data ? (data.numFound > 0 || data.numFoundCT > 0) : false),
      distinctUntilChanged()
    );
    this.isSidenavEnabled = combineLatest(this.isSmall, this.isLoading, this.hasData).pipe(
      map(([isSmall, isLoading, hasData]: boolean[]) => isSmall && !isLoading && hasData)
    );
  }

  getTitle(): string {
    return this.titleService.title;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.highlightingService.enabled.sentences = event.index == 0;  // disable sentence highlighting toggle on clinical trials tabs
    // this._page[1 - event.index] = this.queryService.page;
    // this.queryService.page = this._page[event.index];
  }

  onResultNavigate() {
    this.header.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}
