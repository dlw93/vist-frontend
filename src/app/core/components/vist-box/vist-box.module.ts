import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistBox, VistBoxPage } from './vist-box.component'

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    VistBox, VistBoxPage
  ],
  declarations: [
    VistBox, VistBoxPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VistBoxModule { }
