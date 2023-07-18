import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AuthService, UserService } from '@app/services';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkWithHref,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public userEmail: Observable<string>;
  public showLogin = true;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  public registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService, private authService: AuthService) {
    this.userEmail = userService.user.pipe(filter(user => !!user), map(user => user.username));
  }

  get isSignedIn(): boolean {
    return this.authService.isValid();
  }

  get expires(): number {
    return Math.floor((this.authService.expires().getTime() - new Date().getTime()) / (1000 * 60)); // minutes till expiration
  }

  signIn() {
    this.userService.signIn(this.loginForm.value.username, this.loginForm.value.password);
  }

  signUp() {
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;
    this.userService.signUp(this.registerForm.value, password).then(success => {
      if (success) {
        this.userService.signIn(username, password);
      }
    });
  }

  signOut() {
    this.userService.signOut();
  }
}
