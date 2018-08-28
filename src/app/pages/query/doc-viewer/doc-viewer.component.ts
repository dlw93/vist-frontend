import { Component, OnInit, Input } from '@angular/core';
import { IMedlineDoc } from '@app/shared';
import { IHighlighting } from '@app/pages/query/highlighting';

interface IKeyValue {
  key: string;
  value: string;
}

interface IRow {
  name: string;
  entries: IKeyValue[];
  url: string;
}

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {
  @Input() document: IMedlineDoc;
  @Input() highlight: IHighlighting;

  showStats = false;
  rows: IRow[];

  constructor() {
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

  ngOnInit() {
    this.rows = [
      {
        name: "Mutations",
        entries: this.mutations(this.document.mutation_normalizedValue),
        url: "https://www.ncbi.nlm.nih.gov/snp/rs"
      },
      {
        name: "Genes",
        entries: this.unique(this.document.gene_name),
        url: "https://www.ncbi.nlm.nih.gov/gene/"
      },
      {
        name: "Chemicals",
        entries: this.unique(this.document.chemicals),
        url: "https://www.drugbank.ca/drugs/"
      },
      {
        name: "MeSH Terms",
        entries: this.mesh(this.document.mesh_terms),
        url: "https://www.ncbi.nlm.nih.gov/mesh/?term="
      }
    ];
  }
}
