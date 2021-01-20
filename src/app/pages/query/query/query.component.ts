import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, combineLatest, merge } from 'rxjs';
import { map, distinctUntilChanged, tap, mapTo, filter } from 'rxjs/operators';
import { QueryService, TitleService } from '@app/services';
import { VIST_SLIDE_IN_ANIMATION } from '@app/animations';
import { VistHeader } from '@app/components/vist-header/vist-header.component';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
  animations: [VIST_SLIDE_IN_ANIMATION]
})
export class QueryComponent {
  // ui state
  isLoading: Observable<boolean>;
  hasData: Observable<boolean>;
  hasError: Observable<boolean>;

  // ui config
  isSidenavEnabled: Observable<boolean>;

  // tab config
  hasMedlineData: boolean;
  hasCTData: boolean;
  selectedTabIndex: number;

  showMessage: Observable<"empty" | "error">;

  @ViewChild(VistHeader, { read: ElementRef, static: true }) header: ElementRef;

  constructor(
    queryService: QueryService,
    breakpointObserver: BreakpointObserver,
    private titleService: TitleService) {
    titleService.title = "Search Results";

    this.isLoading = queryService.loading$;
    this.hasError = queryService.error$.pipe(mapTo(true));
    this.hasData = queryService.data$.pipe(
      tap(data => this.hasMedlineData = data ? data.docs.length > 0 : false),
      tap(data => this.hasCTData = data ? data.ct.length > 0 : false),
      tap(data => this.selectedTabIndex = data ? 1 - Math.sign(data.numFound) : 0),  // if there are no Medline results, switch to second tab
      map(data => data ? (data.numFound > 0 || data.numFoundCT > 0) : false),
      //distinctUntilChanged()
    );

    this.showMessage = merge(
      this.hasData.pipe(filter(x => x === false), mapTo("empty")),
      this.hasError.pipe(filter(x => x === true), mapTo<boolean, "error">("error"))
    );

    this.showMessage.pipe(tap(x => console.log(x)));

    const isSmall = breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium]).pipe(map(state => state.matches));
    this.isSidenavEnabled = combineLatest([isSmall, this.isLoading, this.hasData]).pipe(
      map(([isSmall, isLoading, hasData]: boolean[]) => isSmall && !isLoading && hasData)
    );
  }

  getTitle(): string {
    return this.titleService.title;
  }

  onResultNavigate() {
    this.header.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}
