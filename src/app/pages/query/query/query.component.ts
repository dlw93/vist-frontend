import { Component, OnInit } from '@angular/core';
import { QueryService } from '@app/core';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { IHighlighting } from '../highlighting';
import { map } from 'rxjs/operators';
import { TitleService } from '@app/core/services/title.service';
import { ITerms } from '@app/shared';

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
      ]),
    ])
  ]
})
export class QueryComponent implements OnInit {
  highlight: IHighlighting;
  hasData = this.queryService.data$.pipe(map(data => data.numFound > 0));

  constructor(private queryService: QueryService, private titleService: TitleService) {
    titleService.title = "Query Results";
  }

  getTitle(): string {
    return this.titleService.title;
  }

  onTerms(terms: ITerms) {
    this.queryService.terms = terms;
  }

  ngOnInit() {
  }
}
