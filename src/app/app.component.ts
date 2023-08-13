import { Component } from '@angular/core';
import { transition, trigger, query, style, animate, group } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { NavbarComponent } from './chrome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterOutlet,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routingAnimation', [
      transition('* <=> *', [
        group([
          query(
            ':enter', [
            style({ opacity: 0, transform: 'translateY(-30px)' }),
            group([
              animate('0.35s ease-in', style({ opacity: 1 })),
              animate('0.35s ease-out', style({ transform: 'translateY(0)' }))
            ])
          ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
}
