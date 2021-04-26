import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  countryByCodeCountry(code: string): Observable<any> {
    return this.http.get(`https://restcountries.eu/rest/v2/alpha/${code}`);
  }
}
