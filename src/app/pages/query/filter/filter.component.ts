import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IHighlighting } from '../highlighting';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  _highlight: IHighlighting = {
    genes: true,
    mutations: true,
    sentences: true
  };

  @Output() highlight = new EventEmitter<IHighlighting>();

  constructor() { }

  ngOnInit() {
    this.highlight.emit(this._highlight);
  }

}
