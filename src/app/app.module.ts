import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FrameModule, AppComponent } from './frame';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor, AuthService } from '@app/core';

@NgModule({
  imports: [
    BrowserModule,
    FrameModule
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    deps: [AuthService]
  }]
})
export class AppModule {
}
