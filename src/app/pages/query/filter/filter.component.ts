import { Component, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QueryService } from '@app/services';
import { Observable } from 'rxjs';
import { IFilter, IResponse, IHighlighting } from '@app/models';
import { map, startWith, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

interface ICancerType {
  disease: string;
  name: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  _filter: IFilter = {
    cancerType: "any",
    journals: [],
    maxYear: 0,
    maxFiltered: 0,
    minYear: 0,
    minFiltered: 0
  }
  journalControl = new FormControl();
  journalNames: string[];
  journalNamesFiltered: Observable<string[]>;
  readonly cancers: ICancerType[] = [
    { disease: 'Not cancer', name: 'Non-cancer documents' },
    { disease: 'any', name: 'All documents' },
    { disease: 'all', name: 'All cancer types' },
    { disease: 'colorectal cancer', name: 'Colorectal' },
    { disease: 'head and neck cancer', name: 'Head and neck' },
    { disease: 'melanoma', name: 'Melanoma' },
    { disease: 'disease', name: 'Other cancer' }
  ];

  @Output() filter = new EventEmitter<void>();
  @ViewChild("journalInput", { static: true }) private journalInput: ElementRef<HTMLInputElement>;

  constructor(private queryService: QueryService) {
    // only consider valid responses
    const data$: Observable<IResponse> = this.queryService.data$.pipe(filter(data => !!data));

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
