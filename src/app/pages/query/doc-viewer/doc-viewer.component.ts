import { Component, OnInit, Input } from '@angular/core';
import { IMedlineDoc } from '@app/shared';
import { IHighlighting } from '@app/pages/query/highlighting';

interface IMeshTerm {
  id: string;
  name: string;
}

interface IKeyValue {
  key: string;
  value: string;
}

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {
  @Input() document: IMedlineDoc;
  @Input() highlight: IHighlighting;

  showStats = true;

  constructor() { }

  unique(entities: string[], separator = "|"): IKeyValue[] {
    return !entities ? [] : entities.map(name => name.split(separator))
      .map(parts => <IKeyValue>{ key: parts[1], value: parts[0] })
      .filter((el, idx, arr) => arr.indexOf(el) == idx);
  }

  *mesh(list: string): Iterator<IMeshTerm> {
    if (!list) return;

    let regexp = /(D\d{6}):/g;
    let match;
    while ((match = regexp.exec(list)) !== null) {
      yield {
        id: match[1],
        name: match[1]
      };
    }
  }

  ngOnInit() {
  }
}
