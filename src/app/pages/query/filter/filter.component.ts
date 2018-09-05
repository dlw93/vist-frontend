import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IHighlighting } from '../highlighting';
import { QueryService } from '@app/core';
import { Observable } from 'rxjs';
import { IFilter } from '@app/shared';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

interface IMatch {
  index: number;
  pos: number;
}

type Index = Map<string, IMatch[]>;

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
  cancers: Observable<Set<string>>;
  journalControl = new FormControl();
  journalNames: string[];
  journalNamesFiltered: Observable<string[]>;
  journalNamesIndex: Index;

  @Output() highlight = new EventEmitter<IHighlighting>();
  @Output() filter = new EventEmitter<IFilter>();
  @ViewChild("journalInput") private journalInput: ElementRef<HTMLInputElement>;

  private static N = 1;

  constructor(private queryService: QueryService) {
    // retrieve unique cancer types found across all currently valid documents
    this.cancers = this.queryService.data$.pipe(
      map(data => new Set<string>(data.docs.map(doc => doc.cancerType)))
    );

    // retrieve matching journal names while typing (used for autocompletion proposals)
    this.journalNamesFiltered = this.journalControl.valueChanges.pipe(
      startWith(""),
      map(journal => this._filterInput(journal))
    );

    // retrieve the names of the journals of all documents contained in the current result set
    this.queryService.data$.pipe(
      map(data => data.journals.map(journal => journal.name))
    ).subscribe(journalNames => {
      this.journalNames = journalNames;
      this.journalNamesIndex = this._buildIndex(journalNames);
    });

    // set ranges of publication date filter
    this.queryService.data$.pipe(
      map(data => [data.minPublicationFilter, data.maxPublicationFilter])
    ).subscribe(range => {
      const [min, max] = range;
      this._filter.minFiltered = min;
      this._filter.maxFiltered = max;
    });
  }

  private _filterInput(value: string): string[] {
    return this.journalNames.filter(name => name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }

  private _buildIndex(values: string[]): Index {
    let result: Index = new Map<string, IMatch[]>();

    values.forEach((value, index) => {
      for (let i = 0; i < value.length - FilterComponent.N + 1; i++) {
        const ngram = value.substring(i, i + FilterComponent.N).toLowerCase();
        if (!result.has(ngram)) {
          result.set(ngram, []);
        }
        result.get(ngram).push({
          index: index,
          pos: i
        });
      }
    });

    return result;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this._filter.journals.push(event.option.viewValue);
    this.journalInput.nativeElement.value = ""; // after adding a chip, clear the actual input element
    this.journalControl.setValue(""); // signal to the autocompletion observable to reset filters
  }

  remove(journal: string): void {
    const index = this._filter.journals.indexOf(journal);

    if (index >= 0) {
      this._filter.journals.splice(index, 1);
    }
  }

  applyFilter(): void {
    this.filter.emit(this._filter);
  }

  ngOnInit() {
    this.highlight.emit(this._highlight);
  }
}
