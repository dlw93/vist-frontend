import { NgModule } from '@angular/core';
import { AnnotatePipe } from './annotate.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

@NgModule({
  declarations: [
    AnnotatePipe,
    SanitizeHtmlPipe
  ],
  exports: [
    AnnotatePipe,
    SanitizeHtmlPipe
  ]
})
export class PipesModule { }
