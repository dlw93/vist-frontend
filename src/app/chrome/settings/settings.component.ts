import { Component } from '@angular/core';
import { SettingsService } from '@app/services';
import { IHighlighting } from '@app/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  _highlight: IHighlighting;

  constructor(private settingsService: SettingsService) {
    this._highlight = settingsService.highlighting;
  }

  get isDark() {
    return this.settingsService.theme === "dark";
  }

  set isDark(value: boolean) {
    this.settingsService.theme = value ? "dark" : "light";
  }
}
