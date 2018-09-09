import { Component, ViewChild } from '@angular/core';
import { QueryService, VIST_SLIDE_IN_ANIMATION } from '@app/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { TitleService } from '@app/core/services/title.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, combineLatest } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { MedlineResultsComponent } from '@app/pages/query/medline-results/medline-results.component';
import { ClinicalTrialsResultsComponent } from '@app/pages/query/clinical-trials-results/clinical-trials-results.component';

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

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @ViewChild(MedlineResultsComponent) medlineResults: MedlineResultsComponent;
  @ViewChild(ClinicalTrialsResultsComponent) clinicalTrialsResults: ClinicalTrialsResultsComponent;

  constructor(queryService: QueryService, breakpointObserver: BreakpointObserver, private titleService: TitleService) {
    titleService.title = "Query Results";

    this.isSmall = breakpointObserver.observe(Breakpoints.Small).pipe(map(state => state.matches));
    this.isLoading = queryService.loading$;
    this.hasData = queryService.data$.pipe(map(data => data ? data.numFound > 0 : false), distinctUntilChanged());
    this.isSidenavEnabled = combineLatest(this.isSmall, this.isLoading, this.hasData).pipe(
      map(([isSmall, isLoading, hasData]: string[]) => isSmall && !isLoading && hasData)
    );
  }

  getTitle(): string {
    return this.titleService.title;
  }
}
