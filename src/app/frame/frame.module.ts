import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppComponent } from './app/app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VistOverlayModule } from '@app/core';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    NavbarComponent,
    AuthComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    VistOverlayModule,
    AppRoutingModule,
    A11yModule,
    OverlayModule
  ],
  exports: [
    AppComponent
  ],
  providers: [Title],
})
export class FrameModule { }
