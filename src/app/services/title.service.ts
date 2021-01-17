import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private _title: string;

  constructor(private titleService: Title) {
  }

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
    this.titleService.setTitle(`${this._title} | VIST`);
  }
}
