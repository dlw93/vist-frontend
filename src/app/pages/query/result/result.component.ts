import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { animate, style, transition, trigger, group, query, stagger } from '@angular/animations';
import { MatPaginator, MatTable, MatTabGroup } from '@angular/material';
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
      transition('void => *', [
        style({ height: '0px' }),
        animate('450ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '*' }))
      ]),
      transition('* => void', [
        style({ height: '*' }),
        animate('450ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '0px' }))
      ])
    ])
  ]
})
export class ResultComponent implements OnInit {
  @Input() highlight: IHighlighting;
  @ViewChild(MatTabGroup) tabs: MatTabGroup;
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
    this.isLoading = this.queryService.loading$.pipe(debounceTime(200));    // only show loading indicator after waiting for 0.2s
  }

  get expandedDoc(): string {
    return this._expandedDoc;
  }

  set expandedDoc(value: string) {
    this._expandedDoc = (value != this._expandedDoc) ? value : undefined;
  }

  getGenes(doc: IMedlineDoc): string[] {
    return doc.gene_name.map(gene => gene.split("|")[0]);
  }

  ngOnInit() {
    this.paginator.page.asObservable().subscribe((event) => {
      this.queryService.page = {
        nrDocuments: event.pageSize,
        currentPage: event.pageIndex
      };
      this.page = event.pageIndex;
    });

    this.tabs.selectedTabChange.asObservable().subscribe(() => this._expandedDoc = undefined);
  }
}
