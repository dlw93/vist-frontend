import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, TemplateRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'vist-tab',
  standalone: true,
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class VistTabComponent {
  @Input() title: string;
  @Input() active: boolean = false;
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
}

@Component({
  selector: 'vist-tabs',
  templateUrl: './vist-tabs.component.html',
  styleUrls: ['./vist-tabs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule
  ],
})
export class VistTabsComponent implements AfterContentInit {
  @ContentChildren(VistTabComponent) tabs: QueryList<VistTabComponent>;
  activeTemplate: TemplateRef<any>;

  selectTab(tab: VistTabComponent) {
    this.tabs.forEach(tab => tab.active = false);
    tab.active = true;
  }

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter(tab => tab.active);

    if (activeTabs.length == 0) {
      this.selectTab(this.tabs.first);
    }
  }
}
