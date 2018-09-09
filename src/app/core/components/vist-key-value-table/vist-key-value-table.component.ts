import { Component, Input } from '@angular/core';

@Component({
  selector: 'vist-entry',
  templateUrl: './vist-entry.component.html',
  styleUrls: ['./vist-entry.component.css']
})
export class VistEntry {
  @Input() key: string;
}

@Component({
  selector: 'vist-key-value-table',
  template: '<ng-content></ng-content>',
  styles: [':host {display: flex; flex-wrap: wrap;}']
})
export class VistKeyValueTable {
}
