import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private api_url: string = environment.api_url
  
  constructor(private http: HttpClient, private token: TokenService) { }

  all():Observable<any> {
    const headers = {  
      headers: new HttpHeaders({
        'x-access-token': this.token.getToken()
      })
    };
    return this.http.get(`${this.api_url}user/all`, headers);
  }
}
