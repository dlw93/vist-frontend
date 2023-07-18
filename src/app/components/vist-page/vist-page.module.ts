import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VistPage, VistPageSidebar, VistPageContent, VistPageError } from './vist-page.component';
import { VistHeader } from '../vist-header';

@NgModule({
  imports: [
    CommonModule,
    VistHeader,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  exports: [VistPage, VistPageSidebar, VistPageContent, VistPageError],
  declarations: [VistPage, VistPageSidebar, VistPageContent, VistPageError]
})
export class VistPageModule { }
