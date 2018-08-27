import { Component, OnInit } from '@angular/core';
import { TitleService } from '@app/core/services/title.service';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.css']
})
export class EvalComponent implements OnInit {

  constructor(private titleService: TitleService) {
    titleService.title = "Evaluation";
  }

  ngOnInit() {
  }

}
