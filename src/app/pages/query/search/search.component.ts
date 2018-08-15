import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Query} from '../query';
import { IEvalQuery } from '../query.service';
import { VistBox, VistBoxPage } from '../../../vist-box/vist-box.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private readonly _query: Query;
  @Input() evalQueries: IEvalQuery[];
  @Output() search = new EventEmitter<Query>();
  @ViewChild("searchBox") searchBox: VistBox;
  @ViewChild("newQueryPage") newQueryPage: VistBoxPage;

  constructor() {
    this._query = new Query();
  }

  public get query(): Query {
    return this._query;
  }

  public setEvalQuery(q: IEvalQuery) {
    this.query.keywords = "";
    this.query.genes = q.evaluationQueries_genes;
    this.query.mutations = q.evaluationQueries_mutations;
    this.searchBox.selectPage(this.newQueryPage);
  }

  public send() {
    this.search.emit(this.query);
  }

  ngOnInit() {

  }

}
