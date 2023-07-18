import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { EvalHomeComponent } from './home/home.component';
import { EvalComponent } from './eval/eval.component';
import { QuerySelectComponent } from './query-select/query-select.component';

import { VistOverlay, VistOverlayTrigger } from '@app/components/vist-overlay';
import { VistTabsComponent, VistTabComponent } from '@app/components/vist-tabs';
import { VistKeyValueTable, VistEntry } from '@app/components/vist-key-value-table';
import { VistHeader } from '@app/components/vist-header';
import { VistPageModule } from '@app/components/vist-page/vist-page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    VistTabComponent,
    VistTabsComponent,
    VistKeyValueTable,
    VistPageModule,
    VistEntry,
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
