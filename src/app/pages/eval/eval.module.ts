import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { VistTabsModule, VistKeyValueTableModule, VistPageModule } from '@app/components';
import { EvalHomeComponent } from './home/home.component';
import { EvalComponent } from './eval/eval.component';
import { QuerySelectComponent } from './query-select/query-select.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    VistTabsModule,
    VistKeyValueTableModule,
    VistPageModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  declarations: [
    EvalHomeComponent,
    EvalComponent,
    QuerySelectComponent,

  ]
})
export class EvalModule { }
