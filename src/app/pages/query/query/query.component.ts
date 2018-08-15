import { Component, OnInit } from '@angular/core';
import { QueryService, IEvalQuery } from '../query.service';
import { trigger, style, transition, animate, group } from '@angular/animations';
import { IHighlighting } from '../highlighting';
import { Query } from '../query';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css'],
  animations: [
    trigger('showBox', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        group([
          animate('0.5s ease-in', style({ opacity: 1 })),
          animate('0.5s ease-out', style({ transform: 'translateY(0)' }))
        ])
      ]),
    ])
  ]
})
export class QueryComponent implements OnInit {
  data: object;
  highlight: IHighlighting;

  constructor(private queryService: QueryService) {
  }

  public get evalQueries(): IEvalQuery[] {
    return this.queryService.evalQueries;
  }

  public onQuery(q: Query) {
    this.queryService.sendQuery(q).subscribe(data => this.data = data);
  }

  ngOnInit() {
  }

}
