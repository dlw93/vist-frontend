import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavbarComponent } from './navbar/navbar.component';
import { VistOverlayModule } from '@app/components';
import { AppRoutingModule } from '@app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { StyleManagerService } from '@app/services/style-manager.service';

@NgModule({
  declarations: [
    NavbarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTooltipModule,
    VistOverlayModule,
    AppRoutingModule,
    OverlayModule
  ],
  exports: [
    NavbarComponent,
    AuthComponent
  ],
  providers: [Title, StyleManagerService],
})
export class ChromeModule { }
