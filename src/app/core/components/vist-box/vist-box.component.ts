import { Component, AfterContentInit, Input, ViewChild, TemplateRef, QueryList, ContentChildren } from '@angular/core';

@Component({
  selector: 'vist-box-page',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class VistBoxPage {
  @Input() title: string;
  @Input() active: boolean = false;
  @ViewChild(TemplateRef) template: TemplateRef<any>;
}

@Component({
  selector: 'vist-box',
  templateUrl: './vist-box.component.html',
  styleUrls: ['./vist-box.component.scss']
})
export class VistBox implements AfterContentInit {
  @ContentChildren(VistBoxPage) pages: QueryList<VistBoxPage>;

  constructor() { }

  selectPage(page: VistBoxPage) {
    this.pages.forEach(page => page.active = false);
    page.active = true;
  }

  ngAfterContentInit() {
    let activeTabs = this.pages.filter(page => page.active);

    if (activeTabs.length == 0) {
      this.selectPage(this.pages.first);
    }
  }
}
