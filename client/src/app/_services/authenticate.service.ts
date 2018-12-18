import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()
export class AuthenticateService {

  constructor(private _http:HttpClient) { }

  isLoggedIn(){
    if(this.getToken()){
      return true
    }else{
      return false
    }
  }

  getUserInfo(){
    if(this.isLoggedIn()){
      return this._http.get('/api/me')
    }
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    // I should also blacklist the token in the backend, but I figue this type of app won't need it yet.
    localStorage.clear()
  }
}
