import { Injectable } from '@angular/core';
import { IHighlighting } from '@app/models';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(private styleManagerService: StyleManagerService) { }

  private _highlighting: IHighlighting = {
    genes: true,
    mutations: true,
    sentences: true,
    chemicals: true
  };

  private _theme: "light" | "dark" = "light";

  get highlighting(): IHighlighting {
    return this._highlighting;
  }

  get theme() {
    return this._theme;
  }

  set theme(value) {
    this._theme = value;
    this.styleManagerService.setStyle("theme", `assets/${this._theme}.css`);
  }
}
