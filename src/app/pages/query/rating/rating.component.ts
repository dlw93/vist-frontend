import { Component, Input } from '@angular/core';

type TRating = 1 | 2 | 3 | 4 | 5;

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() docId: string;
  @Input() docType: "medline" | "ct";

  private _rating: TRating;

  constructor() { }

  get rating(): TRating {
    return this._rating;
  }

  set rating(value: TRating) {
    this._rating = value;
  }
}
