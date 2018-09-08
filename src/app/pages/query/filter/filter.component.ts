import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryService, HighlightingService } from '@app/core';
import { Observable } from 'rxjs';
import { IFilter, IResponse, IHighlighting } from '@app/shared';
import { map, startWith, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  _highlight: IHighlighting;
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

  @Output() filter = new EventEmitter<void>();
  @ViewChild("journalInput") private journalInput: ElementRef<HTMLInputElement>;

  constructor(highlightingService: HighlightingService, private queryService: QueryService) {
    this._highlight = highlightingService.highlighting;

    // only consider valid responses
    const data$: Observable<IResponse> = this.queryService.data$.pipe(filter(data => !!data));

    // retrieve unique cancer types found across all currently valid documents
    this.cancers = data$.pipe(
      map(data => new Set<string>(data.docs.map(doc => doc.cancerType)))
    );

    // retrieve matching journal names while typing (used for autocompletion proposals)
    this.journalNamesFiltered = this.journalControl.valueChanges.pipe(
      startWith(""),
      map(journal => this._filterInput(journal))
    );

    // retrieve the names of the journals of all documents contained in the current result set
    data$.pipe(
      map(data => data.journals.map(journal => journal.name))
    ).subscribe(journalNames => {
      this.journalNames = journalNames;
    });

    // set ranges of publication date filter
    data$.pipe(
      map(data => [data.minPublicationFilter, data.maxPublicationFilter])
    ).subscribe(range => {
      const [min, max] = range;
      this._filter.minFiltered = min;
      this._filter.maxFiltered = max;
    });
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
    this.queryService.filter = this._filter;
    this.filter.emit();
  }

  private _filterInput(value: string): string[] {
    return this.journalNames.filter(name => name.toLowerCase().indexOf(value.toLowerCase()) >= 0);
  }
}
