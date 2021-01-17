import { Component } from '@angular/core';
import { HighlightingService } from '@app/services';
import { IHighlighting } from '@app/models';

@Component({
  selector: 'app-highlighting',
  templateUrl: './highlighting.component.html',
  styleUrls: ['./highlighting.component.css']
})
export class HighlightingComponent {
  _highlight: IHighlighting;
  _enabled: IHighlighting;

  constructor(highlightingService: HighlightingService) {
    this._highlight = highlightingService.highlighting;
    this._enabled = highlightingService.enabled;
  }
}
