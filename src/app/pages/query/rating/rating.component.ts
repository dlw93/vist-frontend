import { Component, Input } from '@angular/core';

export const ratings = [1, 2, 3, 4, 5] as const;
type TRating = typeof ratings[number];

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() docId: string;
  @Input() docType: "medline" | "ct";

  readonly ratings = ratings;

  private _rating: TRating;

  constructor() { }

  get rating(): TRating {
    return this._rating;
  }

  set rating(value: TRating) {
    this._rating = value;
  }
}
