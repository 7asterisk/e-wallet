import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageKey = 'jwt-token';

  constructor(private router: Router) { }

  setToken(token: string, id: string) {
    localStorage.setItem(this.storageKey, token);
    localStorage.setItem('userId', id);
  }
  getToken() {
    return localStorage.getItem(this.storageKey);
  }
  getUserId() {
    return localStorage.getItem('userId');
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}
