import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { QueryService } from '@app/core';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { IHighlighting } from '../highlighting';
import { map } from 'rxjs/operators';
import { TitleService } from '@app/core/services/title.service';
import { ITerms, IFilter } from '@app/shared';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
  animations: [
    trigger('showBox', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        group([
          animate('0.5s ease-in', style({ opacity: 1 })),
          animate('0.5s ease-out', style({ transform: 'translateY(0)' }))
        ])
      ])
    ])
  ]
})
export class QueryComponent implements OnInit, OnDestroy {
  highlight: IHighlighting;
  hasData = this.queryService.data$.pipe(map(data => data.numFound > 0));
  isSmall: boolean;

  private isSmallSubscription: Subscription;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor(
    private queryService: QueryService,
    private titleService: TitleService,
    private breakpointObserver: BreakpointObserver) {
    titleService.title = "Query Results";
    this.isSmallSubscription = breakpointObserver.observe(Breakpoints.Small).subscribe(state => this.isSmall = state.matches);
  }

  private closeSidenav(): void {
    if (this.isSmall) {
      this.sidenav.close();
    }
  }

  getTitle(): string {
    return this.titleService.title;
  }

  onTerms(terms: ITerms) {
    this.queryService.terms = terms;
    this.closeSidenav();
  }

  onFilter(filter: IFilter) {
    this.queryService.filter = filter;
    this.closeSidenav();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isSmallSubscription.unsubscribe();
  }
}
