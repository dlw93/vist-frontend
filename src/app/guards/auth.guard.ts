import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isValid = this.authService.isValid();
        if (!isValid) {
            this.snackBar.open("You need to sign in to access the evaluation.");
        }
        return isValid;
    }
}
