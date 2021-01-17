import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistHeader } from './vist-header.component'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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
