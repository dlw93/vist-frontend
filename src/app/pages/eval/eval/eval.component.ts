import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { QueryService, TitleService, VIST_SLIDE_IN_ANIMATION } from '@app/core';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css'],
  animations: [VIST_SLIDE_IN_ANIMATION]
})
export class EvalComponent {
  isLoading: Observable<boolean>;
  hasData: Observable<boolean>;
  isSidenavEnabled: Observable<boolean>;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(queryService: QueryService, breakpointObserver: BreakpointObserver, private titleService: TitleService) {
    titleService.title = "Evaluation";

    const isSmall = breakpointObserver.observe(Breakpoints.Small).pipe(map(state => state.matches));
    this.isLoading = queryService.loading$;
    this.hasData = queryService.data$.pipe(
      map(data => data ? (data.numFound > 0 || data.numFoundCT > 0) : false),
      distinctUntilChanged()
    );
    this.isSidenavEnabled = combineLatest(isSmall, this.isLoading, this.hasData).pipe(
      map(([isSmall, isLoading, hasData]: boolean[]) => isSmall && !isLoading && hasData)
    );
  }

  getTitle(): string {
    return this.titleService.title;
  }
}
