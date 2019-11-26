import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHighlighting, IClinicalTrialDoc } from '@app/shared';
import { QueryService, VIST_EXPAND_ANIMATION, HighlightingService, AnnotateRegexPipe } from '@app/core';

interface IEntry {
  url: string;
  value: string;
}

interface ISection {
  title: string;
  content: SafeHtml;
}

@Component({
  selector: 'app-clinical-trials-results',
  templateUrl: './clinical-trials-results.component.html',
  styleUrls: ['./clinical-trials-results.component.css'],
  animations: [VIST_EXPAND_ANIMATION]
})
export class ClinicalTrialsResultsComponent {
  @Output() navigate = new EventEmitter<void>();

  private _expandedDoc: string;

  readonly displayedColumns = ['score', 'title', 'phase', 'status'];
  dataSource: Observable<IClinicalTrialDoc[]>;
  resultsLength: Observable<number>;
  highlighting: IHighlighting;

  constructor(private queryService: QueryService, private highlightingService: HighlightingService, private sanitizer: DomSanitizer) {
    this.dataSource = this.queryService.data$.pipe(map(data => data ? data.ct : []));
    this.resultsLength = this.queryService.data$.pipe(map(data => data ? data.numFoundCT : 0));
    this.highlighting = this.highlightingService.highlighting;
  }

  get expandedDoc(): string {
    return this._expandedDoc;
  }

  set expandedDoc(value: string) {
    this._expandedDoc = (value != this._expandedDoc) ? value : undefined;
  }

  sections(doc: IClinicalTrialDoc): ISection[] {
    const sections = {
      'brief_summary': 'Summary',
      'description': 'Description',
      'intervention_description': 'Intervention'
    };

    return Object.keys(sections)
      .filter(sec => !!doc[sec] && doc[sec].trim() !== "")
      .map(sec => <ISection>{
        title: sections[sec],
        content: this.annotate(doc[sec].trim(), doc)
      });
  }

  unique(entities: string[]): IEntry[] {
    return !entities ? [] : entities.map(name => name.split("|"))
      .map(parts => <IEntry>{ url: parts[2], value: parts[0] })
      .filter((el, idx, arr) => arr.indexOf(el) == idx);
  }

  private annotate(content: string, doc: IClinicalTrialDoc): SafeHtml {
    const regex: AnnotateRegexPipe = new AnnotateRegexPipe();

    content = regex.transform(content, doc.mutation_normalizedValue, 'mutation');
    content = regex.transform(content, doc.gene_name, 'gene');
    content = regex.transform(content, doc.chemicals, 'chemical');

    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
