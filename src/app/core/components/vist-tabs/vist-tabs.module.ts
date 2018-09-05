import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistTabs, VistTab } from './vist-tabs.component'

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [VistTabs, VistTab],
    declarations: [VistTabs, VistTab]
})
export class VistTabsModule { }
