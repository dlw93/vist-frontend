import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '@app/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public accountButtonTitle: Observable<string>;
  public authView: Observable<string>;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService) {
    this.accountButtonTitle = userService.user.pipe(map(user => user ? user.firstName : 'Sign In'));
    this.authView = userService.user.pipe(map(user => user ? 'account' : 'login'));
  }

  public login() {
    this.userService.signIn(this.loginForm.value.username, this.loginForm.value.password).then(resp => {
      console.log(resp);
    });
  }
}
