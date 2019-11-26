import { Component, Input, ViewChild, TemplateRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

@Component({
  selector: 'vist-tab',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class VistTab {
  @Input() title: string;
  @Input() active: boolean = false;
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
}

@Component({
  selector: 'vist-tabs',
  templateUrl: './vist-tabs.component.html',
  styleUrls: ['./vist-tabs.component.scss']
})
export class VistTabs implements AfterContentInit {
  @ContentChildren(VistTab) tabs: QueryList<VistTab>;
  activeTemplate: TemplateRef<any>;

  selectTab(tab: VistTab) {
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
