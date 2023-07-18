import { Directive, Input, ElementRef, HostListener, ViewContainerRef } from '@angular/core';
import { VistOverlay } from './vist-overlay.component';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[vistOverlayTriggerFor]',
  standalone: true
})
export class VistOverlayTrigger {
  @Input('vistOverlayTriggerFor') vistOverlay: VistOverlay;
  private portal: TemplatePortal;
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, private element: ElementRef<HTMLElement>, private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('click')
  open(): void {
    if (!this.overlayRef) {
      const position: ConnectedPosition = { originX: 'end', overlayX: 'end', originY: 'bottom', overlayY: 'top' };

      this.portal = new TemplatePortal(this.vistOverlay.templateRef, this.viewContainerRef);
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay.position().flexibleConnectedTo(this.element).withPositions([position]),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop'
      });
      this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    }

    this.overlayRef.attach(this.portal);
  }
}
