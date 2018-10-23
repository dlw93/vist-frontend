import { Component } from '@angular/core';
import { AuthService, UserService } from '@app/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  public userName: Observable<string>;
  public userEmail: Observable<string>;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.userName = userService.user.pipe(filter(user => !!user), map(user => user.firstName));
    this.userEmail = userService.user.pipe(filter(user => !!user), map(user => user.username));
  }

  public get isSignedIn(): boolean {
    return this.authService.isValid()
  }

  signOut(): void {
    this.userService.signOut();
  }
}
