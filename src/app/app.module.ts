import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FrameModule, AppComponent } from './frame';

@NgModule({
  imports: [
    BrowserModule,
    FrameModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
