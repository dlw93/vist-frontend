import { Injectable, isDevMode } from '@angular/core';
import { IUser, IAuthResponse, IAuthToken } from '@app/models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user$ = new BehaviorSubject<IUser>(null);
  private static readonly _HEADER = { headers: { 'Content-Type': 'application/json' } };

  constructor(private http: HttpClient, private authService: AuthService) {
    authService.onExpiration(() => this._refresh(), 10_000);   // 10s before token expiration, acquire a fresh token
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
    const data = { ...user, password }
    return firstValueFrom(this.http.post<IAuthResponse>("/users", data, UserService._HEADER).pipe(map(response => !response)))
  }

  /**
   * Sign the user in and fetches his data.
   * @param username The user's name
   * @param password The user's password
   */
  public signIn(username: string, password: string): Promise<boolean> {
    return firstValueFrom(this.http.post<IAuthToken & IAuthResponse>("/auth", { username, password }, UserService._HEADER)
      .pipe(
        map(response => {
          if (!!response.token) {
            this.authService.token = response.token;
            this.getUserData().then(user => this._user$.next(user));
          }
          return !response.error;
        })
      ));
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
    return firstValueFrom(this.http.get<IUser>("/users/current"));
  }

  /**
   * Acquire a new token as long as the user's current token is still valid.
   */
  private _refresh() {
    this.http.get<IAuthToken & IAuthResponse>("/auth").toPromise().then(response => {
      if (!!response.token) {
        this.authService.token = response.token;
      }
    });
  }
}
