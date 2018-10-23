import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { VistOverlay } from './vist-overlay.component'
import { VistOverlayTrigger } from './vist-overlay-trigger.directive';

@NgModule({
    imports: [
        CommonModule,
        A11yModule,
        OverlayModule
    ],
    exports: [VistOverlay, VistOverlayTrigger],
    declarations: [VistOverlay, VistOverlayTrigger]
})
export class VistOverlayModule { }
