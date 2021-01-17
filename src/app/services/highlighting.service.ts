import { Injectable } from '@angular/core';
import { IHighlighting } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class HighlightingService {
  private _highlighting: IHighlighting = {
    genes: true,
    mutations: true,
    sentences: true,
    chemicals: true
  };

  private _enabled: IHighlighting = {
    genes: true,
    mutations: true,
    sentences: true,
    chemicals: true
  };

  constructor() { }

  get highlighting(): IHighlighting {
    return this._highlighting;
  }

  get enabled(): IHighlighting {
    return this._enabled;
  }
}
