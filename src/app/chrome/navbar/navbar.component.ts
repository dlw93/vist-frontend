import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '@app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StyleManagerService } from '@app/services/style-manager.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public authView: Observable<string>;
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  public tooltip: Observable<string>;

  constructor(private userService: UserService, private styleManagerService: StyleManagerService) {
    this.tooltip = userService.user.pipe(map(user => user?.firstName ?? 'Sign In'));
    this.authView = userService.user.pipe(map(user => user ? 'account' : 'login'));
  }

  public login() {
    this.userService.signIn(this.loginForm.value.username, this.loginForm.value.password);
  }

  private light = false;
  public inc() {
    this.light = !this.light;
    this.styleManagerService.setStyle("theme", `assets/${this.light ? "light" : "dark"}.css`);
  }
}
