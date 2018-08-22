import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AppComponent } from './app/app.component';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    ContentComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
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
