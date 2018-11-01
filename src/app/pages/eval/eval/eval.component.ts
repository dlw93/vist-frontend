import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { EvalService, TitleService, VIST_SLIDE_IN_ANIMATION } from '@app/core';
import { IEvalQuery, IEvalResponse } from '@app/shared';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css'],
  animations: [VIST_SLIDE_IN_ANIMATION]
})
export class EvalComponent {
  isSmall: boolean;
  isLoading: boolean;
  hasData: boolean;
  data: IEvalResponse;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(private evalService: EvalService, breakpointObserver: BreakpointObserver, private titleService: TitleService) {
    titleService.title = "Evaluation";
    breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium]).subscribe(state => this.isSmall = state.matches);
  }

  get isSidenavEnabled(): boolean {
    return this.isSmall && !this.isLoading && this.hasData;
  }

  getTitle(): string {
    return this.titleService.title;
  }

  onQuery(q: IEvalQuery) {
    this.isLoading = true;
    this.evalService.send(null).then(response => {
      this.data = response;
      this.hasData = response.docs && response.docs.length > 0;
      this.isLoading = false;
    });
  }
}
