import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatProgressSpinnerModule } from '@angular/material';
import { VistPage, VistPageSidebar, VistPageContent, VistPageError } from './vist-page.component';
import { VistHeaderModule } from '../vist-header/vist-header.module';

@NgModule({
  imports: [
    CommonModule,
    VistHeaderModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  exports: [VistPage, VistPageSidebar, VistPageContent, VistPageError],
  declarations: [VistPage, VistPageSidebar, VistPageContent, VistPageError]
})
export class VistPageModule { }
