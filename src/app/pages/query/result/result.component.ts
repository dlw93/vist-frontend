import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator, MatTable } from '@angular/material';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { IHighlighting } from '../highlighting';
import { IMedlineDoc } from '@app/shared';
import { QueryService } from '@app/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, *', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ResultComponent implements OnInit {
  @Input() highlight: IHighlighting;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<IMedlineDoc>;

  private _expandedDoc: string;

  readonly displayedColumns = ['score', 'title', 'year'];
  dataSource: Observable<IMedlineDoc[]>;
  resultsLength: Observable<number>;
  isLoading: Observable<boolean>;
  page: number;

  constructor(private queryService: QueryService) {
    this.dataSource = this.queryService.data$.pipe(map(data => data.docs));
    this.resultsLength = this.queryService.data$.pipe(map(data => data.numFound));
    this.isLoading = this.queryService.loading$.pipe(debounceTime(200));
  }

  get expandedDoc(): string {
    return this._expandedDoc;
  }

  set expandedDoc(value: string) {
    this._expandedDoc = (value != this._expandedDoc) ? value : undefined;
  }

  ngOnInit() {
    this.paginator.page.asObservable().subscribe((event) => {
      this.queryService.page = {
        nrDocuments: event.pageSize,
        currentPage: event.pageIndex
      };
      this.page = event.pageIndex;
    });
  }
}
