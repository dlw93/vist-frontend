import { NgModule } from '@angular/core';
import { EvalComponent } from './eval/eval.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  VistBoxModule,
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
  MatTooltipModule
} from '@angular/material';
import { QuerySelectComponent } from './query-select/query-select.component';
import { EvalStatusComponent } from './eval-status/eval-status.component';

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
    MatTooltipModule
  ],
  declarations: [
    EvalComponent,
    QuerySelectComponent,
    EvalStatusComponent
  ]
})
export class EvalModule { }
