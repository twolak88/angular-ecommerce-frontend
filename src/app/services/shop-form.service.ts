import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]> {
    const serviceUrl = `${environment.baseBackendServiceUrl}${environment.countriesBackendServiceUrl}`;
    return this.httpClient.get<GetResponseCountries>(serviceUrl)
      .pipe(
        map(response => response._embedded.countries)
      );
  }

  getStates(countryCode: string): Observable<State[]> {
    const serviceUrl = `${environment.baseBackendServiceUrl}${environment.statesSearchByCountryCodeBackendServiceUrl}`;
    return this.httpClient.get<GetResponseStates>(serviceUrl, {
      params: new HttpParams().set('code', countryCode)
    }).pipe(
      map(response => response._embedded.states)
    );
  }
}

export interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

export interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}

