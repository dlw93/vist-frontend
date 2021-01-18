import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vist-header',
  templateUrl: './vist-header.component.html',
  styleUrls: ['./vist-header.component.scss']
})
export class VistHeader implements OnInit {
  @Input() title: string;
  @Input() showToggle: boolean;

  ngOnInit() {
  }
}
