import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";

const appRoutes = [
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: 'products', patchMatch: 'full' },
  { path: '**', redirectTo: 'products', patchMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
