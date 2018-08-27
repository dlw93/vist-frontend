import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app/app.component';
import { MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule } from '@angular/material';
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
    AppRoutingModule
  ],
  exports: [
    AppComponent
  ],
  providers: [Title],
})
export class FrameModule { }
