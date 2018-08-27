import { Component, OnInit } from '@angular/core';
import { transition, trigger, query, style, animate, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routingAnimation', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'translateY(-40px)' }),
              group([
                animate('0.3s ease-in', style({ opacity: 1 })),
                animate('0.3s ease-out', style({ transform: 'translateY(0)' }))
              ])
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({ opacity: 1 }),
              group([
                animate('0.3s ease-in', style({ opacity: 0 })),
                animate('0.3s ease-out', style({ transform: 'translateY(-40px)' }))
              ])
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'VIST';

  constructor() {
  }

  ngOnInit(): void {

  }
}
