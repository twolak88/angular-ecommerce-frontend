import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { OktaAuthGuard, OktaCallbackComponent } from "@okta/okta-angular";
import { CartDetailsComponent } from "./components/cart-details/cart-details.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { LoginComponent } from "./components/login/login.component";
import { MembersPageComponent } from "./components/members-page/members-page.component";
import { OrderListComponent } from "./components/order-list/order-list.component";
import { ProductDetailsComponent } from "./components/product-list/product-details/product-details.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

const appRoutes = [
  { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [OktaAuthGuard] },
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'category/:id/:name', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
