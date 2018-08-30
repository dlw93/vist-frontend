import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistHeader } from './vist-header.component'
import { MatButtonModule, MatIconModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [VistHeader],
    declarations: [VistHeader]
})
export class VistHeaderModule { }
