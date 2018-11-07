import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { FrameModule, AppComponent } from './frame';
import { AuthInterceptor, AuthService } from '@app/core';

@NgModule({
  imports: [
    BrowserModule,
    FrameModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { 
        duration: 4000,
        verticalPosition: 'top',
        panelClass: 'snackbar-light'
      }
    }
  ]
})
export class AppModule {
}
