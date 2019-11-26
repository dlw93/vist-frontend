import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';
import { EvalService, VIST_EXPAND_ANIMATION, AuthService } from '@app/core';
import { IEvalQuery, IMedlineDoc, IFeedback } from '@app/shared';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css'],
  animations: [VIST_EXPAND_ANIMATION]
})
export class EvalComponent implements OnDestroy {
  data: IMedlineDoc[];
  resultLength: number;
  hasData: boolean;
  useful: { [pmid: string]: string };
  classification: { [pmid: string]: string };
  isLoading: Observable<boolean>;
  current: IEvalQuery;

  readonly displayedColumns = ['status', 'score', 'title', 'year'];
  readonly relevanceScale = [
    { caption: 'Highly Relevant', value: 'Highly Relevant' },
    { caption: 'Relevant', value: 'Relevant' },
    { caption: 'Matches but Not Relevant', value: 'Matches but not relevant' },
    { caption: 'Irrelevant', value: 'Irrelevant' },
    { caption: 'Unknown', value: 'Unknown' }
  ];
  readonly classificationScale = [
    { caption: 'Yes', value: 'Yes' },
    { caption: 'No', value: 'No' },
    { caption: 'Unknown', value: 'Unknown' }
  ];

  private _expandedDoc: string;
  private _dataSub: Subscription;
  private _feedbackSub: Subscription;
  private _querySub: Subscription;

  constructor(private evalService: EvalService, private snackBar: MatSnackBar, private router: Router, authService: AuthService) {
    this.isLoading = this.evalService.loading$;

    this._dataSub = this.evalService.data$.subscribe(response => {
      this.data = response ? response.docs : [];
      this.resultLength = this.data.length;
      this.hasData = this.data.length > 0;
    });

    this._feedbackSub = this.evalService.feedback$.subscribe(feedback => {
      this.useful = {};
      this.classification = {};
      (feedback || []).forEach(item => {
        this.useful[item.pmid] = item.useful;
        this.classification[item.pmid] = item.classification;
      });
    });

    this._querySub = this.evalService.query$.subscribe(query => this.current = query);

    authService.onInvalidation(() => {
      this._sendFeedback(() => this.router.navigate(['']));
    });
  }

  ngOnDestroy() {
    this._sendFeedback();
    this._dataSub.unsubscribe();
    this._feedbackSub.unsubscribe();
    this._querySub.unsubscribe();
  }

  onSubmit() {
    const complete = this.isFeedbackComplete();
    this._sendFeedback(() => {
      if (complete) {
        this.router.navigate(['/eval']);
      }
    });
  }

  onQuery(q: IEvalQuery) {
    if (this.feedbackCount > 0) {
      this._sendFeedback(() => this.evalService.sendQuery(q));
    } else {
      this.evalService.sendQuery(q);
    }
    this.current = null;    // set the current query to null, so the mat-card control is removed an re-inserted, making the contained mat-tab-group go to tab #0
  }

  get expandedDoc(): string {
    return this._expandedDoc;
  }

  set expandedDoc(value: string) {
    this._expandedDoc = (value != this._expandedDoc) ? value : undefined;
  }

  /**
   * Whether a document in the result set has been rated.
   * If no pmid is provided, we return whether all documents have been rated.
   * @param pmid
   */
  isFeedbackComplete(pmid?: string): boolean {
    return !!pmid ? !!this.useful[pmid] && !!this.classification[pmid] : this.data.length == this.feedbackCount;
  }

  _headerIcon(): string {
    if (this.isFeedbackComplete()) { return 'check_box'; }
    else if (this.feedbackCount == 0) { return 'check_box_outline_blank'; }
    else { return 'indeterminate_check_box'; }
  }

  _rowIcon(pmid: string): string {
    return this.isFeedbackComplete(pmid) ? 'check_box' : 'check_box_outline_blank';
  }

  /**
   * The number of completely evaluated documents.
   */
  get feedbackCount(): number {
    return this._feedback.length;
  }

  /**
   * Passes the feedback data to the evaluation service.
   * @param action A function to be executed after successful transmission.
   */
  private _sendFeedback(action?: () => void) {
    if (this.feedbackCount > 0) {
      this.evalService.sendFeedback(this._feedback, !this.isFeedbackComplete()).then(success => {
        if (success) {
          this.snackBar.open('Your feedback was successfully saved.', 'Dismiss');
          if (!!action) { action(); }
        }
      });
    }
  }

  /**
   * Represents the current feedback data as an array of IFeedback objects
   */
  private get _feedback(): IFeedback[] {
    return Object.entries(this.useful)
      .filter(([pmid, ]) => !!this.useful[pmid] && !!this.classification[pmid])    // remove incomplete feedback items, i.e. with 'useful' or 'classification' unset
      .map(([pmid, useful]) => ({
        pmid: pmid,
        queryId: this.current.evaluationQueries_id,
        useful: useful,
        classification: this.classification[pmid]
      }));
  }
}
