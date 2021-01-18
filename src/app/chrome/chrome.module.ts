import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarComponent } from './navbar/navbar.component';
import { VistOverlayModule } from '@app/components';
import { AppRoutingModule } from '@app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AuthComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    VistOverlayModule,
    AppRoutingModule,
    MatSlideToggleModule
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [Title],
})
export class ChromeModule { }
