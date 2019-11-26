import { NgModule } from '@angular/core';
import { AnnotateRegexPipe } from './annregex.pipe';
import { AnnotateIndexPipe } from './annidx.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

@NgModule({
  declarations: [
    AnnotateRegexPipe,
    AnnotateIndexPipe,
    SanitizeHtmlPipe
  ],
  exports: [
    AnnotateRegexPipe,
    AnnotateIndexPipe,
    SanitizeHtmlPipe
  ]
})
export class PipesModule { }
