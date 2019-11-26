import { Component } from '@angular/core';
import { TitleService } from '@app/core/services/title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(titleService: TitleService, private router: Router) {
    titleService.title = "Welcome";
  }

  navigate() {
    this.router.navigate(['results']);
  }
}
