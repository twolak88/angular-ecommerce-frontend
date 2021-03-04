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
  private readonly searchUrl = `${environment.baseBackendServiceUrl}${environment.productsSearchByCategoryIdBackendServiceUrl}`;

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {

    return this.httpClient.get<GetResponse>(this.searchUrl, {
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
