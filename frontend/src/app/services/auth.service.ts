import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private api_url: string = environment.api_url
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private http: HttpClient) { }

  register(email, password, fullname): Observable<any> {
    const params = {
      email: email,
      password: password,
      fullname: fullname
    }
    return this.http.post(`${this.api_url}auth/register`, params, this.headers);
  }

  login(email, password): Observable<any> {
    const params = {
      email: email,
      password: password
    }
    return this.http.post(`${this.api_url}auth/login`, params, this.headers);
  }
}
