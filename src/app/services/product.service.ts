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

  private baseUrl = environment.baseBackendServiceUrl + 'products';

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId: number): Observable<Product[]> {
    //TODO enhance service to handle currentCategoryId
    return this.httpClient.get<GetResponse>(this.baseUrl)
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
