import { Injectable } from '@angular/core';

const auth_token = 'auth_token';
const auth_user = 'auth_user';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  logout() {
    window.sessionStorage.clear();
  }

  setToken(token: string) {
    window.sessionStorage.removeItem(auth_token);
    window.sessionStorage.setItem(auth_token, token);
  }

  getToken() {
    return window.sessionStorage.getItem(auth_token);
  }

  setUser(user: any) {
    window.sessionStorage.removeItem(auth_user);
    window.sessionStorage.setItem(auth_user, JSON.stringify(user));
  }
  
  getUser() {
    const user = window.sessionStorage.getItem(auth_user);
    if(user) {
      return JSON.parse(user);
    }
    return false;
  }
}
