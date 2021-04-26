import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TimezoneService } from './timezone.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  key_weatherapi: string = environment.key_weatherapi;

  constructor(private http: HttpClient, private timezoneService: TimezoneService) { }

  getByName(timezone: string): Observable<any> {
    return this.http.get(`http://api.weatherapi.com/v1/current.json?key=${this.key_weatherapi}&q=${timezone}&aqi=yes`);
  }
}
