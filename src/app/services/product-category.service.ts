import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private readonly serviceUrl = `${environment.baseBackendServiceUrl}${environment.productCategoryBackendServiceUrl}`;

  constructor(private httpClient: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponse>(this.serviceUrl)
      .pipe(
        map(response => response._embedded.productCategory)
      );
  }
}

interface GetResponse {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
