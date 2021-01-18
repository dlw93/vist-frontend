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
import { VistOverlayModule, VistTabsModule, } from '@app/components';
import { VistHeaderModule, } from '@app/components';
import { VistKeyValueTableModule } from '@app/components';
import { PipesModule } from '@app/pipes/pipes.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatTableModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSelectModule,
    MatChipsModule,
    MatTooltipModule,
    MatRadioModule,
    VistOverlayModule
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
