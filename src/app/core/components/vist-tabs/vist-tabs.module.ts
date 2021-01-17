import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core'
import { VistTabs, VistTab } from './vist-tabs.component'

@NgModule({
    imports: [
        CommonModule,
        MatRippleModule
    ],
    exports: [VistTabs, VistTab],
    declarations: [VistTabs, VistTab]
})
export class VistTabsModule { }
