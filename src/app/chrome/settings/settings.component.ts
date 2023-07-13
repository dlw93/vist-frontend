import { Component } from '@angular/core';
import { SettingsService } from '@app/services';
import { IHighlighting } from '@app/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    FormsModule,
  ],
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
