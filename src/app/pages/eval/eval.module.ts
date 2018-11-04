import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatTableModule, MatProgressSpinnerModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { VistTabsModule, VistKeyValueTableModule, VistPageModule } from '@app/core';
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
    MatCheckboxModule
  ],
  declarations: [
    EvalHomeComponent,
    EvalComponent,
    QuerySelectComponent,
    
  ]
})
export class EvalModule { }
