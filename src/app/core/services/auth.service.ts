import { Injectable } from '@angular/core';
import { IAuthData } from '@app/shared';

type TCallback = () => void;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly _KEY = "currentUser";
  private _token: string;
  private _invalidationCallbacks: TCallback[] = [];
  private _expirationCallbacks: [TCallback, number][] = [];

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
    if (!!value) {
      // if we are provided a valid token, we reset the timers for calling the respective expiration callbacks
      let span = this.getAuthData(value).expires.valueOf() - new Date().valueOf();  // milliseconds till expiration
      this._expirationCallbacks.forEach(([cb, ms]) => setTimeout(() => cb(), span - ms));
    }
    else {
      // otherwise, we call the appropriate invalidation callbacks
      this._invalidationCallbacks.forEach(cb => cb());
    }
    this._token = localStorage[AuthService._KEY] = value || "";
  }

  /**
   * Register an action to be performed before the user's token is invalidated.
   * @param callback The action to perform.
   */
  public onInvalidation(callback: () => void) {
    this._invalidationCallbacks.push(callback);
  }

  /**
   * Register an action to be performed before the user's token expires.
   * @param callback The action to perform.
   * @param ms The number of milliseconds the action shall be performed before expiration.
   */
  public onExpiration(callback: () => void, ms: number = 10000) {
    // if there's no currently valid token, we only register the callback for later
    if (this.isValid()) {
      let timeout = Math.max(0, this.expires().valueOf() - new Date().valueOf() - ms);  // milliseconds till timeout
      setTimeout(() => callback(), timeout);
    }
    this._expirationCallbacks.push([callback, ms]);
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
