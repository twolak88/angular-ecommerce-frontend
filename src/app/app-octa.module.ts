import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import myAppConfig from './config/my-app-config';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';

const oktaConfig = Object.assign({
  onAuthRequired: (injector) => {
    const router = injector.get(Router);
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

@NgModule({
  declarations: [],
  imports: [
    OktaAuthModule
  ],
  exports: [OktaAuthModule],
  providers: [{provide: OKTA_CONFIG, useValue: oktaConfig}],
})
export class AppOctaModule { }
