import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistKeyValueTable, VistEntry } from './vist-key-value-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [VistKeyValueTable, VistEntry],
  exports: [VistKeyValueTable, VistEntry]
})
export class VistKeyValueTableModule { }
