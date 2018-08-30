import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vist-header',
  templateUrl: './vist-header.component.html',
  styleUrls: ['./vist-header.component.scss']
})
export class VistHeader implements OnInit {
  constructor() {
  }

  @Input() title: string;
  @Input() showToggle: boolean;
  @Output() toggle = new EventEmitter<void>();

  ngOnInit() {
  }
}
