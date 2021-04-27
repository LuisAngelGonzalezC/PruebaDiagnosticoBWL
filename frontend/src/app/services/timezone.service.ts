import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TimezoneService {
    
  key_timezonedb: string = environment.key_timezonedb;
  
  constructor(private http: HttpClient) { }

  getByCodeCountry(code: string): Observable<any> {
    return this.http.get(`http://api.timezonedb.com/v2.1/list-time-zone?key=${this.key_timezonedb}&format=json&country=${code}&fields=zoneName`);
  }
  
  getByZoneName(name: string): Observable<any> {
    return this.http.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${this.key_timezonedb}&format=json&by=zone&zone=${name}`);
  }
}
