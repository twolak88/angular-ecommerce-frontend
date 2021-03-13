import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { BehaviorSubject } from 'rxjs';
import { AuthData } from '../common/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authData: BehaviorSubject<AuthData> = new BehaviorSubject(new AuthData());

  constructor(private oktaAuthService: OktaAuthService) {
    this.oktaAuthService.$authenticationState.subscribe(
      result => {
        let authData = new AuthData();
        authData.isAuthenticated = result;
        this.getUserDetails(authData);
      }
    );
  }

  logout() {
    this.oktaAuthService.signOut();
    this.authData.next(new AuthData());
  }

  private getUserDetails(authData: AuthData) {
    if (authData.isAuthenticated) {
      this.oktaAuthService.getUser().then(
        res => {
          authData.userFullName = res.name
          authData.email = res.email;
          authData.firstName = res.given_name;
          authData.lastName = res.family_name;
          this.authData.next(authData);
        }
      );
    }
  }
}
