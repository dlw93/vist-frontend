import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryComponent } from './query/query.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { MedlineResultsComponent } from './medline-results/medline-results.component';
import { ClinicalTrialsResultsComponent } from './clinical-trials-results/clinical-trials-results.component';
import {
  VistTabsModule,
  VistHeaderModule,
  VistKeyValueTableModule,
  PipesModule
} from '@app/core';
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
  MatChipsModule,
  MatTooltipModule,
  MatRadioModule
} from '@angular/material';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    VistTabsModule,
    VistHeaderModule,
    VistKeyValueTableModule,
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
    MatChipsModule,
    MatTooltipModule,
    MatRadioModule
  ],
  declarations: [
    QueryComponent,
    SearchComponent,
    FilterComponent,
    MedlineResultsComponent,
    ClinicalTrialsResultsComponent,
    RatingComponent
  ],
  exports: [
    SearchComponent,
    MedlineResultsComponent
  ]
})
export class ResultModule { }
