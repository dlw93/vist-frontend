import { Injectable, isDevMode } from '@angular/core';
import { IUser, IAuthResponse, IAuthToken } from '@app/shared';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$ = new BehaviorSubject<IUser>(null);
  private static readonly _HEADER = { headers: { 'Content-Type': 'application/json' } };

  constructor(private http: HttpClient, private authService: AuthService) {
    if (authService.isValid()) {
      this.getUserData().then(user => this._user$.next(user));
    }
  }

  /**
   * Signs up a new user and returns whether the operation was completed successfully.
   * @param user The new user's username
   * @param password The new user's password
   */
  public signUp(user: IUser, password: string): Promise<boolean> {
    const url: string = isDevMode() ? '/assets/user.json' : '/users';
    const data = Object.assign({}, user, { password: password });
    return this.http.post<IAuthResponse>(url, data, UserService._HEADER).pipe(map(response => !response.error)).toPromise();
  }

  /**
   * Sign the user in and fetches his data.
   * @param username The user's name
   * @param password The user's password
   */
  public signIn(username: string, password: string): Promise<boolean> {
    const url: string = isDevMode() ? '/assets/token.json' : '/auth';
    const data = { username: username, password: password };
    return this.http.post<IAuthToken & IAuthResponse>(url, data, UserService._HEADER).pipe(map(response => {
      if (!!response.token) {
        this.authService.token = response.token;
        this.getUserData().then(user => this._user$.next(user));
      }
      return !response.error;
    })).toPromise();
  }

  /**
   * Signs the current user out so he can now longer access protected routes.
   */
  public signOut(): void {
    this.authService.token = null;
    this._user$.next(null);
  }

  /**
   * The currently signed-in user's data.
   */
  public get user(): Observable<IUser> {
    return this._user$.asObservable();
  }

  private getUserData(): Promise<IUser> {
    const url: string = isDevMode() ? '/assets/user.json' : '/users/current';
    return this.http.get<IUser>(url).toPromise();
  }
}
