import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Msal from 'msal';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MsalService {

  helper = new JwtHelperService();

  clientApplication = new Msal.UserAgentApplication(environment.auth.clientID, environment.auth.authority,
    (errorDesc: any, token: any, error: any, tokenType: any) => {
      // Called after loginRedirect or acquireTokenPopup
      this.saveAccessTokenToCache(token);
    }
  );

  public login(): void {
    this.clientApplication.loginRedirect(environment.auth.b2cScopes);
  }

  saveAccessTokenToCache(accessToken: string): void {
    const profile = this.helper.decodeToken(accessToken);
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('profile', JSON.stringify(profile));
  }

  logout(): void {
    this.clientApplication.logout();
  }

  isOnline(): boolean {
    return this.clientApplication.getUser() != null;
  }

}
