import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTable } from '@angular/material';
import { IMedlineDoc } from '@app/shared';
import { Observable } from 'rxjs';
import { QueryService, VIST_EXPAND_ANIMATION } from '@app/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-medline-results',
  templateUrl: './medline-results.component.html',
  styleUrls: ['./medline-results.component.css'],
  animations: [VIST_EXPAND_ANIMATION]
})
export class MedlineResultsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<IMedlineDoc>;

  private _expandedDoc: string;

  readonly displayedColumns = ['score', 'title', 'year'];
  dataSource: Observable<IMedlineDoc[]>;
  resultsLength: Observable<number>;
  page: number;

  constructor(private queryService: QueryService) {
    this.dataSource = this.queryService.data$.pipe(map(data => data ? data.docs : []));
    this.resultsLength = this.queryService.data$.pipe(map(data => data ? data.numFound : 0));
    this.page = this.queryService.page.currentPage;
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
    this.paginator.page.asObservable().subscribe(event => {
      this.queryService.page = {
        nrDocuments: event.pageSize,
        currentPage: event.pageIndex
      };
      this.page = event.pageIndex;
    });
  }
}
