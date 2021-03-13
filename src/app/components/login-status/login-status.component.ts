import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authData.subscribe(
      authData => {
        this.isAuthenticated = authData.isAuthenticated;
        this.userFullName = authData.userFullName;
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
