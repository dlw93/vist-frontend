import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
  }

  title: string;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => route.firstChild),
      switchMap(route => route.data),
      map(data => data.title)
    ).subscribe(title => {
      this.title = title;
      this.titleService.setTitle(`${title} | VIST`);  // TODO: bad style to set page title from within arbitrary component :/
    });
  }
}
