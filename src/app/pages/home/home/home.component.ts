import { Component, Inject } from '@angular/core';
import { TitleService } from '@app/services/title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private titleService: TitleService, @Inject(Router) private router: Router) {
    titleService.title = "Welcome";
  }

  getTitle(): string {
    return this.titleService.title;
  }

  navigate() {
    this.router.navigate(['results']);
  }
}
