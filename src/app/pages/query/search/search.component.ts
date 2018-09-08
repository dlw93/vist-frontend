import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { VistBox, VistBoxPage, QueryService } from '@app/core';
import { IEvalQuery, ITerms } from '@app/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild("searchBox") searchBox: VistBox;
  @ViewChild("newQueryPage") newQueryPage: VistBoxPage;
  @Input() reset: boolean = false;
  @Output() terms = new EventEmitter<ITerms>();

  readonly displayedColumns: string[] = ['evaluationQueries_genes', 'evaluationQueries_mutations', 'select'];

  evalQueries: Observable<IEvalQuery[]>;
  query: ITerms = { keywords: "", genes: "", mutations: "" };

  constructor(private queryService: QueryService) {
  }

  ngOnInit() {
    this.evalQueries = this.queryService.getEvalQueries();

    // remember and show the parameters of the most recent query if exists and not explicitly told not to do so
    if (!this.reset && !!this.queryService.terms) {
      this.query = this.queryService.terms;
    }
  }

  public setEvalQuery(q: IEvalQuery) {
    this.query.keywords = "";
    this.query.genes = q.evaluationQueries_genes;
    this.query.mutations = q.evaluationQueries_mutations;
    this.searchBox.selectPage(this.newQueryPage);
  }

  public send() {
    this.queryService.terms = this.query;
    this.terms.emit();
  }
}
