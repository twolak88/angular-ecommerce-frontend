import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderData } from '../common/order-data';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getOrderListPaginate(email: string, page: number, pageSize: number): Observable<GetResponse> {
    const searchUrl = `${environment.baseBackendServiceUrl}${environment.orderSearchByCustomerEmail}`;
    const httpParams = new HttpParams()
      .set('email', email)
      .set('page', page.toString())
      .set('size', pageSize.toString());
      console.log(searchUrl)
    return this.httpClient.get<GetResponse>(searchUrl, {
      params: httpParams
    });
  }
}

export interface GetResponse {
  _embedded: {
    orders: OrderData[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
