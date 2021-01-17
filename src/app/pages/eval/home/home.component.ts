import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EvalService } from '@app/services';
import { IEvalQuery } from '@app/models';

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
