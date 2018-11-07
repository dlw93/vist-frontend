import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isValid()) {
            this.snackBar.open("You need to sign in to access the evaluation.", "Sign In");
        }

        return this.authService.isValid();
    }
}
