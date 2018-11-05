import { Injectable } from '@angular/core';
import { IAuthData } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly _KEY = "currentUser";
  private __token: string;  // this variable should never be used directly, except in the respective getter/setter
  private _callbacks: ((auto: boolean) => void)[] = [];

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
    this._token = localStorage[AuthService._KEY] = value || "";
  }

  /**
   * Register an action to be performed before the user's token expires or is invalidated.
   * @param callback The action to perform. The parameter indicates whether the token has expired automatically.
   */
  public onExpiration(callback: (auto: boolean) => void) {
    this._callbacks.push(callback);
  }

  private get _token(): string {
    return this.__token;
  }

  /**
   * If provided a "valid" token, we set a timer to fire shortly before its expiration.
   */
  private set _token(value: string) {
    if (!!value) {  // provided a "valid" token, i.e. neither null, undefined or ""
      let ms = this.getAuthData(value).expires.valueOf() - new Date().valueOf();  // milliseconds till expiration
      setTimeout(() => {
        this._callbacks.forEach(cb => cb(true));  // execute all previously provided callbacks
      }, ms - 10000); // fire 10s before expiration
    } else {
      this._callbacks.forEach(cb => cb(false));
    }
    this.__token = value;
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
