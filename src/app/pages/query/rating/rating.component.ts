import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() docId: string;
  @Input() docType: "medline" | "ct";

  private _isRelevant: boolean = false;

  constructor() { }

  public get isRelevant(): boolean {
    return this._isRelevant;
  }

  public set isRelevant(value: boolean) {
    this._isRelevant = value;
  }
}
