import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vist-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vist-header.component.html',
  styleUrls: ['./vist-header.component.scss']
})
export class VistHeader implements OnInit {
  @Input() title: string;
  @Input() showToggle: boolean;

  ngOnInit() {
  }
}
