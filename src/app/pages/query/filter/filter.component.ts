import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IHighlighting } from '../highlighting';
import { QueryService } from '@app/core';
import { Observable } from 'rxjs';
import { IJournal, IFilter } from '@app/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  _highlight: IHighlighting = {
    genes: true,
    mutations: true,
    sentences: true,
    chemicals: true
  };
  _filter: IFilter = {
    cancerType: "",
    journals: [],
    maxYear: 0,
    maxFiltered: 0,
    minYear: 0,
    minFiltered: 0
  }
  journals: Observable<IJournal[]>;

  @Output() highlight = new EventEmitter<IHighlighting>();

  constructor(private queryService: QueryService) {
    this.journals = this.queryService.data$.pipe(map(data => data.journals));
  }

  ngOnInit() {
    this.highlight.emit(this._highlight);
  }
}
