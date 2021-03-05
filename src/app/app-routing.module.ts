import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductDetailsComponent } from "./components/product-list/product-details/product-details.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

const appRoutes = [
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
