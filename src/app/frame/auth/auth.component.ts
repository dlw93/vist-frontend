import { Component } from '@angular/core';
import { UserService, AuthService } from '@app/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
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
