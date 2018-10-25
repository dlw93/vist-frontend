import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvalQuery } from '@app/shared';
import { QueryService } from '@app/core';

@Component({
  selector: 'app-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.css']
})
export class QuerySelectComponent implements OnInit {
  readonly displayedColumns: string[] = ['evaluationQueries_genes', 'evaluationQueries_mutations', 'execute'];
  evalQueries: Observable<IEvalQuery[]>;

  constructor(private queryService: QueryService) {
    this.evalQueries = this.queryService.getEvalQueries();
  }

  ngOnInit() {
  }

  runEvalQuery(): void {

  }
}
