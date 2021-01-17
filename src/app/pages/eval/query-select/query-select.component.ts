import { Component, Output, EventEmitter } from '@angular/core';
import { IEvalQuery } from '@app/models';
import { EvalService } from '@app/services';

@Component({
  selector: 'app-query-select',
  templateUrl: './query-select.component.html',
  styleUrls: ['./query-select.component.css']
})
export class QuerySelectComponent {
  readonly cols: string[] = ['genes', 'mutations', 'cancer', 'execute'];
  queries: Promise<IEvalQuery[]>;
  selection: IEvalQuery;
  showFinished = false;

  @Output() terms = new EventEmitter<IEvalQuery>();

  constructor(private evalService: EvalService) {
    this.queries = this.evalService.queries;
  }

  run(q: IEvalQuery): void {
    this.selection = q;
    this.terms.emit(q);
  }
}
