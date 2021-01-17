import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { VIST_SOFT_IN_OUT_ANIMATION } from '@app/animations';

@Component({
  selector: 'vist-overlay',
  templateUrl: './vist-overlay.component.html',
  styleUrls: ['./vist-overlay.component.scss'],
  animations: [VIST_SOFT_IN_OUT_ANIMATION]
})
export class VistOverlay {
  @Input() origin: CdkOverlayOrigin;
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  private _isOpen: boolean;

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public set isOpen(value: boolean) {
    this._isOpen = value;
  }
}
