import { Component } from '@angular/core';
import { AuthService } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public accountButtonTitle: Observable<string>;
  public authView: Observable<string>;

  constructor(authService: AuthService, userService: UserService) {
    this.accountButtonTitle = userService.user.pipe(map(user => user ? user.firstName : 'Sign In'));
    this.authView = userService.user.pipe(map(user => user ? 'account' : 'login'));
  }
}
