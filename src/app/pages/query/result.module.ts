import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VistBoxModule, VistTabsModule, VistHeaderModule, PipesModule } from '@app/core';
import { QueryComponent } from './query/query.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { MedlineResultsComponent } from './medline-results/medline-results.component';
import { ClinicalTrialsResultsComponent } from './clinical-trials-results/clinical-trials-results.component';
import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
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
  MatSidenavModule,
  MatCardModule,
  MatSelectModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    VistBoxModule,
    VistTabsModule,
    VistHeaderModule,
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
    MatCardModule,
    MatSidenavModule,
    MatSelectModule,
    MatChipsModule
  ],
  declarations: [
    QueryComponent,
    SearchComponent,
    FilterComponent,
    DocViewerComponent,
    MedlineResultsComponent,
    ClinicalTrialsResultsComponent
  ],
  exports: [
    SearchComponent
  ]
})
export class ResultModule { }
