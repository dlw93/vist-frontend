import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services';

export function authGuard() {
    const authService = inject(AuthService);
    const snackBar = inject(MatSnackBar);

    const isValid = authService.isValid();
    if (!isValid) {
        snackBar.open("You need to sign in to access the evaluation.");
    }
    return isValid;
}
