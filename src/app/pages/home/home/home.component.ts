import { Component, OnInit } from '@angular/core';
import { TitleService } from '@app/core/services/title.service';
import { ITerms } from '@app/shared';
import { QueryService } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private titleService: TitleService, private queryService: QueryService, private router: Router) {
    titleService.title = "Welcome";
  }

  ngOnInit() {
  }

  onQuery(terms: ITerms) {
    this.queryService.terms = terms;
    this.router.navigate(['results']);
  }
}
