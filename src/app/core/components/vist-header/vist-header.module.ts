import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistHeader } from './vist-header.component'

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [VistHeader],
    declarations: [VistHeader]
})
export class VistHeaderModule { }
