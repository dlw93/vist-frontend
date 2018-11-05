import { Injectable } from '@angular/core';
import { IAuthData } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly _KEY = "currentUser";
  private _token: string;
  private _callbacks: (() => void)[] = [];

  constructor() {
    this._token = localStorage[AuthService._KEY];
  }

  public isValid(): boolean {
    return this._token ? this.getAuthData(this._token).expires > new Date() : false;
  }

  public expires(): Date {
    return this._token ? this.getAuthData(this._token).expires : null;
  }

  /**
   * Gets or sets the token used to authenticate with the server.
   */
  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    if (!value) {  // provided an invalid token, i.e. either null, undefined or ""
      this._callbacks.forEach(cb => cb());
    }
    this._token = localStorage[AuthService._KEY] = value || "";
  }

  /**
   * Register an action to be performed before the user's token expires or is invalidated.
   * @param callback The action to perform.
   */
  public onInvalidation(callback: () => void) {
    this._callbacks.push(callback);
  }

  /**
   * Extracts the data from a JWT token.
   */
  private getAuthData(token: string): IAuthData {
    let [, payload] = token.split(".");
    let data = JSON.parse(atob(payload));

    return {
      id: data['sub'],
      expires: new Date(data['exp'] * 1000)
    }
  }
}
