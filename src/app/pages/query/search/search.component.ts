import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatTabGroup } from '@angular/material/tabs';
import { Observable, merge } from 'rxjs';
import { startWith, switchMap, filter } from 'rxjs/operators';
import { QueryService } from '@app/services';
import { IEvalQuery, ITerms, IGeneCandidate } from '@app/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(MatTabGroup, { static: true }) tabs: MatTabGroup;
  @ViewChild("geneInput") geneInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto", { static: true }) geneAutocomplete: MatAutocomplete;

  @Input() reset: boolean = false;
  @Output() terms = new EventEmitter<void>();

  readonly displayedColumns: string[] = ['evaluationQueries_genes', 'evaluationQueries_mutations', 'select'];

  evalQueries: Observable<IEvalQuery[]>;
  query: ITerms = { keywords: "", genes: [], mutations: "" };
  geneControl = new FormControl();
  geneCandidates: Observable<IGeneCandidate[]>;

  showCustom = true;

  constructor(private queryService: QueryService) {
    this.geneCandidates = this.geneControl.valueChanges.pipe(
      startWith(""),
      filter(partial => partial.length > 1),
      switchMap(partial => this.queryService.getGeneCandidates(partial, this.query.genes))
    );
  }

  ngOnInit() {
    this.evalQueries = this.queryService.samples$;

    // remember and show the parameters of the most recent query if exists and not explicitly told not to do so
    if (!this.reset && !!this.queryService.terms) {
      this.query = this.queryService.terms;
    }
  }

  onSelected(event: MatAutocompleteSelectedEvent): void {
    this.query.genes.push(event.option.value);
    this.geneInput.nativeElement.value = ""; // after adding a chip, clear the actual input element
    this.geneControl.setValue(""); // signal to the autocompletion observable to reset filters
  }

  onRemoved(gene: IGeneCandidate): void {
    const index = this.query.genes.indexOf(gene);

    if (index >= 0) {
      this.query.genes.splice(index, 1);
    }
  }

  public setEvalQuery(q: IEvalQuery) {
    this.query.genes = [];
    merge(
      ...q.evaluationQueries_genes    // "a, b, c"
        .split(",")
        .map(gene => gene.trim())     // ["a", "b", "c"]
        .map(gene => this.queryService.getGeneCandidates(gene, []))  // Observable per gene
    ).subscribe(res => {              // subscribe to merged Observable (==> only one subscription)
      this.query.genes.push(res[0])
    });

    this.query.keywords = "";
    this.query.mutations = q.evaluationQueries_mutations;
    this.showCustom = true;
  }

  public send() {
    this.queryService.terms = this.query;
    this.terms.emit();
  }
}
