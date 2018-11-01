import { NgModule } from '@angular/core';
import { EvalComponent } from './eval/eval.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatCheckboxModule,
  MatStepperModule
} from '@angular/material';
import { QuerySelectComponent } from './query-select/query-select.component';
import { ResultModule } from '../query/result.module';
import { WizardComponent } from './wizard/wizard.component'

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
    MatCheckboxModule,
    MatStepperModule,
    ResultModule
  ],
  declarations: [
    EvalComponent,
    QuerySelectComponent,
    WizardComponent
  ]
})
export class EvalModule { }
