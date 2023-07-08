import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import { VistOverlayModule } from '@app/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { SettingsComponent } from './settings/settings.component';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavbarComponent,
    AuthComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    VistOverlayModule,
    RouterOutlet,
    RouterLinkWithHref,
    MatSlideToggleModule
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [Title],
})
export class ChromeModule { }
