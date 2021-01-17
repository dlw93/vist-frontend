import { Component, ViewChild, ElementRef, Input, OnInit, TemplateRef, ContentChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { VistHeader } from '@app/components/vist-header/vist-header.component';
import { TitleService } from '@app/services/title.service';
import { VIST_SLIDE_IN_ANIMATION } from '../../animations';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'vist-page-sidebar, [vist-page-sidebar], [vistPageSidebar]',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class VistPageSidebar {
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
}

@Component({
  selector: 'vist-page-content, [vist-page-content], [vistPageContent]',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class VistPageContent {
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
}

@Component({
  selector: 'vist-page-error, [vist-page-error], [vistPageError]',
  template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class VistPageError {
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<any>;
}

@Component({
  selector: 'vist-page',
  templateUrl: './vist-page.component.html',
  styleUrls: ['./vist-page.component.css'],
  animations: [VIST_SLIDE_IN_ANIMATION]
})
export class VistPage implements OnInit {
  @Input() title: string;
  @Input() loading: boolean;
  @Input() error: boolean;

  @ViewChild(VistHeader, { read: ElementRef, static: true }) private _header: ElementRef;
  @ViewChild(MatSidenav) _sidenav: MatSidenav;
  @ContentChild(VistPageSidebar, /* TODO: add static flag */ { static: true }) _sidebar: VistPageSidebar;
  @ContentChild(VistPageContent, /* TODO: add static flag */ { static: true }) _content: VistPageContent;
  @ContentChild(VistPageError, /* TODO: add static flag */ { static: true }) _error: VistPageError;

  private _isSmall: boolean;

  constructor(breakpointObserver: BreakpointObserver, private titleService: TitleService) {
    breakpointObserver.observe([Breakpoints.Small, Breakpoints.Medium]).subscribe(state => this._isSmall = state.matches);
  }

  ngOnInit() {
    this.titleService.title = this.title;
  }

  get isSmall(): boolean {
    return this._isSmall && !this.loading && !this.error;
  }

  scrollToTop() {
    this._header.nativeElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}
