import { Injectable } from '@angular/core';
import { IAuthData } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly _KEY = "currentUser";
  private _token: string;

  constructor() {
    this._token = localStorage[AuthService._KEY];
  }

  public isValid(): boolean {
    return this._token ? this.getAuthData(this._token).expires > new Date() : false;
  }

   /**
    * Gets or sets the token used to authenticate with the server.
    */
  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = localStorage[AuthService._KEY] = value ? value : "";
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
