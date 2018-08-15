import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VistBoxModule } from '../../vist-box/vist-box.module';
import { QueryComponent } from './query/query.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';
import { AnnotatePipe } from './annotate.pipe';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSlideToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    VistBoxModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  declarations: [
    QueryComponent,
    SearchComponent,
    FilterComponent,
    ResultComponent,
    AnnotatePipe,
    SanitizeHtmlPipe
  ],
  exports: [
    QueryComponent
  ]
})
export class QueryModule { }
