import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import myAppConfig from './config/my-app-config';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

@NgModule({
  imports: [
    OktaAuthModule
  ],
  exports: [OktaAuthModule],
  providers: [{provide: OKTA_CONFIG, useValue: oktaConfig}],
})
export class AppOctaModule { }
