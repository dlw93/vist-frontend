import { Component } from '@angular/core';
import { EvalService, VIST_EXPAND_ANIMATION } from '@app/core';
import { IEvalQuery, IMedlineDoc } from '@app/shared';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css'],
  animations: [VIST_EXPAND_ANIMATION]
})
export class EvalComponent {
  isLoading: boolean;
  data: IMedlineDoc[];
  resultLength: number;
  hasData: boolean;
  current: IEvalQuery;

  readonly displayedColumns = ['score', 'title', 'year'];

  private _expandedDoc: string;

  constructor(private evalService: EvalService) {
    this.isLoading = true;
    this.evalService.data$.subscribe(response => {
      this.data = response ? response.docs : [];
      this.resultLength = this.data.length
      this.hasData = this.data.length > 0;
      this.isLoading = false;
    });
    this.evalService.query$.subscribe(query => this.current = query);
  }

  get expandedDoc(): string {
    return this._expandedDoc;
  }

  set expandedDoc(value: string) {
    this._expandedDoc = (value != this._expandedDoc) ? value : undefined;
  }

  onQuery(q: IEvalQuery) {
    this.isLoading = true;
    this.evalService.sendQuery(q);
  }
}
