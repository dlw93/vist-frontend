import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { VistBoxModule, PipesModule } from '@app/core';
import { QueryComponent } from './query/query.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';
import {
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSlideToggleModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatCardModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    VistBoxModule,
    PipesModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCardModule
  ],
  declarations: [
    QueryComponent,
    SearchComponent,
    FilterComponent,
    ResultComponent,
    DocViewerComponent
  ]
})
export class QueryModule { }
