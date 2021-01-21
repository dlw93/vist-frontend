import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, combineLatest, merge, Subscription } from 'rxjs';
import { map, tap, mapTo, filter, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';
import { QueryService, TitleService } from '@app/services';
import { VIST_SLIDE_IN_ANIMATION } from '@app/animations';
import { VistHeader } from '@app/components/vist-header/vist-header.component';

interface IMessage {
  icon: string;
  title: string;
  subtitle: string;
}

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

  // ui config
  isSidenavEnabled: Observable<boolean>;

  // tab config
  hasMedlineData: boolean;
  hasCTData: boolean;
  selectedTabIndex: number;

  msg: IMessage;

  private messageSub: Subscription;

  @ViewChild(VistHeader, { read: ElementRef, static: true }) header: ElementRef;

  private static readonly EMPTY_MESSAGE: IMessage = {
    icon: "sentiment_dissatisfied",
    title: "Your last query did not yield any results.",
    subtitle: "Refine your query or try one of the sample queries."
  };

  private static readonly ERROR_MESSAGE: IMessage = {
    icon: "error",
    title: "The result size exceeds the server's capacity.",
    subtitle: "Try to narrow your query and try again."
  };

  constructor(queryService: QueryService, breakpointObserver: BreakpointObserver, private titleService: TitleService) {
    titleService.title = "Search Results";

    this.isLoading = queryService.loading$;
    this.hasData = queryService.data$.pipe(
      tap(data => this.hasMedlineData = data?.docs?.length > 0),
      tap(data => this.hasCTData = data?.ct?.length > 0),
      tap(data => this.selectedTabIndex = data ? 1 - Math.sign(data.numFound) : 0),  // if there are no Medline results, switch to second tab
      map(data => data ? (data.numFound > 0 || data.numFoundCT > 0) : false),
    );

    const empty$ = this.hasData.pipe(filter(x => x === false), mapTo(QueryComponent.EMPTY_MESSAGE));
    const error$ = queryService.error$.pipe(filter(x => x !== null), mapTo(QueryComponent.ERROR_MESSAGE));
    this.messageSub = merge(empty$, error$).pipe(distinctUntilKeyChanged("icon")).subscribe(msg => this.msg = msg);

    const isSmall = breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium]).pipe(map(state => state.matches));
    this.isSidenavEnabled = combineLatest([isSmall, this.isLoading, this.hasData]).pipe(
      map(([isSmall, isLoading, hasData]: boolean[]) => isSmall && !isLoading && hasData)
    );
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
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
