import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule, MatInputModule } from '@angular/material';
import { AppComponent } from './app/app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VistOverlayModule } from '@app/core';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
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
