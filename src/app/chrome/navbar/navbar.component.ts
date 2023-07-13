import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '@app/services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { VistOverlayModule } from '@app/components';
import { AuthComponent } from '../auth/auth.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    VistOverlayModule,
    RouterOutlet,
    RouterLinkWithHref,
    AuthComponent,
    SettingsComponent
  ],
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

  constructor(private userService: UserService) {
    this.tooltip = userService.user.pipe(map(user => user?.firstName ?? 'Sign In'));
    this.authView = userService.user.pipe(map(user => user ? 'account' : 'login'));
  }

  public login() {
    this.userService.signIn(this.loginForm.value.username, this.loginForm.value.password);
  }
}
