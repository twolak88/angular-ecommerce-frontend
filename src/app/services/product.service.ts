import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseProductsUrl = `${environment.baseBackendServiceUrl}products/`;

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseProductsUrl}search/findByCategoryId`;

    return this.httpClient.get<GetResponse>(searchUrl, {
      params: {
        'id': currentCategoryId.toString()
      }
    })
      .pipe(
        map(response => response._embedded.products)
      );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
