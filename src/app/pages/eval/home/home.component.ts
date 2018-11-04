import { Component } from '@angular/core';
import { EvalService } from '@app/core';
import { IEvalQuery } from '@app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eval-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class EvalHomeComponent {
  constructor(private evalService: EvalService, private router: Router) {
  }

  onQuery(q: IEvalQuery) {
    this.evalService.sendQuery(q);
    this.router.navigate(['eval/results'])
  }
}
