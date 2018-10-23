import { Component, ViewChild } from '@angular/core';
import { QueryService, VIST_SLIDE_IN_ANIMATION, HighlightingService, TitleService } from '@app/core';
import { map, distinctUntilChanged, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, combineLatest } from 'rxjs';
import { MatSidenav, MatTabGroup, MatTabChangeEvent } from '@angular/material';
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
  hasMedlineData: boolean;
  hasCTData: boolean;
  selectedTabIndex: number;

  @ViewChild(MatSidenav) sidenav: MatSidenav;
  @ViewChild(MedlineResultsComponent) medlineResults: MedlineResultsComponent;
  @ViewChild(ClinicalTrialsResultsComponent) clinicalTrialsResults: ClinicalTrialsResultsComponent;
  @ViewChild(MatTabGroup) tabs: MatTabGroup;

  constructor(
    queryService: QueryService,
    breakpointObserver: BreakpointObserver,
    private titleService: TitleService,
    private highlightingService: HighlightingService) {
    titleService.title = "Query Results";

    this.isSmall = breakpointObserver.observe(Breakpoints.Small).pipe(map(state => state.matches));
    this.isLoading = queryService.loading$;
    this.hasData = queryService.data$.pipe(
      tap(data => this.hasMedlineData = data ? data.numFound > 0 : false),
      tap(data => this.hasCTData = data ? data.numFoundCT > 0 : false),
      tap(data => this.selectedTabIndex = data ? 1 - Math.sign(data.numFound) : 0),  // if there are no Medline results, switch to second tab
      map(data => data ? (data.numFound > 0 || data.numFoundCT > 0) : false),
      distinctUntilChanged()
    );
    this.isSidenavEnabled = combineLatest(this.isSmall, this.isLoading, this.hasData).pipe(
      map(([isSmall, isLoading, hasData]: string[]) => isSmall && !isLoading && hasData)
    );
  }

  getTitle(): string {
    return this.titleService.title;
  }

  onTabChange(event: MatTabChangeEvent) {
    this.highlightingService.enabled.sentences = event.index == 0;  // disable sentence highlighting toggle on clinical trials tabs
  }
}
