import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'vist-entry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vist-entry.component.html',
  styleUrls: ['./vist-entry.component.css']
})
export class VistEntry {
  @Input() key: string;
}

@Component({
  selector: 'vist-key-value-table',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [':host {display: flex; flex-wrap: wrap;}']
})
export class VistKeyValueTable { }
