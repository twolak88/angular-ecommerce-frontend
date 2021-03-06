import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number) {
    const productUrl = `${environment.baseBackendServiceUrl}${environment.productsBackendServiceUrl}${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(currentCategoryId: number): Observable<Product[]> {
    const searchUrl = `${environment.baseBackendServiceUrl}${environment.productsSearchByCategoryIdBackendServiceUrl}`;
    const params: HttpParams = new HttpParams()
      .set('id', currentCategoryId.toString());
    return this.getProducts(searchUrl, params);
  }

  getProductListPaginate(currentCategoryId: number, page: number, pageSize: number): Observable<GetResponse> {
    const searchUrl = `${environment.baseBackendServiceUrl}${environment.productsSearchByCategoryIdBackendServiceUrl}`;
    const params: HttpParams = new HttpParams()
      .set('id', currentCategoryId.toString())
      .set('page', page.toString())
      .set('size', pageSize.toString());
    return this.httpClient.get<GetResponse>(searchUrl, {
      params: params
    });
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${environment.baseBackendServiceUrl}${environment.productsSearchByNameBackendServiceUrl}`;
    const params: HttpParams = new HttpParams()
      .set('name', theKeyword);
    return this.getProducts(searchUrl, params);
  }

  private getProducts(url: string, httpParams: HttpParams): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(url, {
      params: httpParams
    })
    .pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number

  }
}
