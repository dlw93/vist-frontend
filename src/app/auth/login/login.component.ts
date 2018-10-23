import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private router: Router) {
  }

  public login() {
    this.userService.signIn(this.loginForm.value.username, this.loginForm.value.password).then(resp => {
      if (resp) {
        this.router.navigate([{ outlets: { 'auth': ['account'] } }]);
      }
    });
  }
}
