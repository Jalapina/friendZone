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
    if(this.getToken()){
      return this._http.get('/api/users/me')
    }else{
      console.log("No token")
    }
    // .toPromise().then(function(data){

    // })
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
