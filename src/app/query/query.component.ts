import {Component, OnInit} from '@angular/core';
import { Query } from '../query';
import { QueryService, IEvalQuery } from '../query.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  private _data: object;

  constructor(private queryService: QueryService) {
  }

  public get data(): object {
    return this._data;
  }

  public get evalQueries(): IEvalQuery[] {
    return this.queryService.evalQueries;
  }

  private onQuery(q: Query) {
    this.queryService.sendQuery(q).subscribe(data => this._data = data);
  }

  ngOnInit() {
  }

}
