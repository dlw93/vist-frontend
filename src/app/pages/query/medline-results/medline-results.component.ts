import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMedlineDoc, IHighlighting } from '@app/shared';
import { QueryService, VIST_EXPAND_ANIMATION, HighlightingService, AuthService } from '@app/core';

interface IKeyValue {
  key: string;
  value: string;
}

interface IEntry {
  name: string;
  entries: IKeyValue[];
  url: string;
}

@Component({
  selector: 'app-medline-results',
  templateUrl: './medline-results.component.html',
  styleUrls: ['./medline-results.component.css'],
  animations: [VIST_EXPAND_ANIMATION]
})
export class MedlineResultsComponent implements OnInit {
  @Input() data: IMedlineDoc[];
  @Input() showEval: boolean;
  @Output() navigate = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _expandedDoc: string;

  readonly displayedColumns = ['score', 'title', 'year'];
  dataSource: Observable<IMedlineDoc[]>;
  resultsLength: Observable<number>;
  page: number;
  highlighting: IHighlighting;
  isLoading: boolean;

  constructor(private queryService: QueryService, private highlightingService: HighlightingService, private authService: AuthService) {
    this.dataSource = this.queryService.data$.pipe(map(data => data ? data.docs : []));
    this.resultsLength = this.queryService.data$.pipe(map(data => data ? data.numFound : 0));
    this.page = this.queryService.page.currentPage;
    this.highlighting = this.highlightingService.highlighting;

    this.dataSource.subscribe(() => this.isLoading = false);
  }

  ngOnInit() {
    this.paginator.page.asObservable().subscribe(event => {
      this.queryService.page = {
        nrDocuments: event.pageSize,
        currentPage: event.pageIndex
      };
      this.page = event.pageIndex;
      this.isLoading = true;
      this.navigate.emit();
    });
  }

  get showRating(): boolean {
    return this.authService.isValid();
  }

  get expandedDoc(): string {
    return this._expandedDoc;
  }

  set expandedDoc(value: string) {
    this._expandedDoc = (value != this._expandedDoc) ? value : undefined;
  }

  rows(doc: IMedlineDoc): IEntry[] {
    return [
      {
        name: "Mutations",
        entries: this.mutations(doc.mutation_normalizedValue),
        url: "https://www.ncbi.nlm.nih.gov/snp/rs"
      },
      {
        name: "Genes",
        entries: this.unique(doc.gene_name),
        url: "https://www.ncbi.nlm.nih.gov/gene/"
      },
      {
        name: "Chemicals",
        entries: this.unique(doc.chemicals),
        url: "https://www.drugbank.ca/drugs/"
      },
      {
        name: "MeSH Terms",
        entries: this.mesh(doc.mesh_terms),
        url: "https://www.ncbi.nlm.nih.gov/mesh/?term="
      }
    ];
  }

  private unique(entities: string[]): IKeyValue[] {
    return !entities ? [] : entities.map(name => name.split("|"))
      .map(parts => <IKeyValue>{ key: parts[1], value: parts[0] })
      .filter((el, idx, arr) => arr.indexOf(el) == idx);
  }

  private mutations(entities: string[]): IKeyValue[] {
    return !entities ? [] : entities.map(entity => entity.split(":"))
      .map(entity => <IKeyValue>{ key: entity[1], value: entity[0].split("|")[0] })
      .filter((el, idx, arr) => arr.indexOf(el) == idx);
  }

  private mesh(list: string = ""): IKeyValue[] {
    if (!list) return [];

    let start = list.match(/D\d+:/g).map(match => list.indexOf(match)); // find all positions where an entity starts
    let result: IKeyValue[] = new Array<IKeyValue>(start.length);

    for (let i = 0; i < start.length; i++) {
      const str = list.substring(start[i], start[Math.min(i + 1, list.length)]).trim();  // extract entity and remove trailing whitespace
      const col = str.indexOf(":");
      const end = Number(str.lastIndexOf(",") == str.length - 1); // offset from end of string to remove trailing comma (if any)

      result[i] = {
        key: str.substring(0, col),
        value: str.substring(col + 1, str.length - end)
      };
    }

    return result;
  }
}
