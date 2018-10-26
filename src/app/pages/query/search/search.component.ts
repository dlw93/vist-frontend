import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatTabGroup } from '@angular/material';
import { Observable, merge } from 'rxjs';
import { startWith, switchMap, filter } from 'rxjs/operators';
import { QueryService } from '@app/core';
import { IEvalQuery, ITerms, IGeneCandidate } from '@app/shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(MatTabGroup) tabs: MatTabGroup;
  @ViewChild("geneInput") geneInput: ElementRef<HTMLInputElement>;
  @Input() reset: boolean = false;
  @Output() terms = new EventEmitter<void>();

  readonly displayedColumns: string[] = ['evaluationQueries_genes', 'evaluationQueries_mutations', 'select'];

  evalQueries: Observable<IEvalQuery[]>;
  query: ITerms = { keywords: "", genes: [], mutations: "" };
  geneControl = new FormControl();
  geneCandidates: Observable<IGeneCandidate[]>;

  constructor(private queryService: QueryService) {
    this.geneCandidates = this.geneControl.valueChanges.pipe(
      startWith(""),
      filter(partial => partial.length > 1),
      switchMap(partial => this.queryService.getGeneCandidates(partial, this.query.genes))
    );
  }

  ngOnInit() {
    this.evalQueries = this.queryService.getEvalQueries();

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
        .map(gene => this.queryService.getGeneCandidates(gene.trim(), []))  // Observable per gene
    ).subscribe(res => {              // subscribe to merged Observable (==> only one subscription)
      this.query.genes.push(res[0])
    });

    this.query.keywords = "";
    this.query.mutations = q.evaluationQueries_mutations;
    this.tabs.selectedIndex = 0;
  }

  public send() {
    this.queryService.terms = this.query;
    this.terms.emit();
  }
}
