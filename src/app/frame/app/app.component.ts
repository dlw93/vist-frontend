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
              style({ opacity: 0, transform: 'translateY(-30px)' }),
              group([
                animate('0.35s ease-in', style({ opacity: 1 })),
                animate('0.35s ease-out', style({ transform: 'translateY(0)' }))
              ])
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [animate('0.35s ease-in', style({ opacity: 0 }))],
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
