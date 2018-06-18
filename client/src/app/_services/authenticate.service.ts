import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/toPromise';
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
      console.log("getting user info")
      return this._http.get('/api/me')
      .map(Response => {
        localStorage.setItem('user',JSON.stringify(Response['_id']))
        console.log(Response)}
      )
    }
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token');
  }
}
