import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../login/user'

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  loadUser(){
    return._http.get('/api/users/loadUser')
    .map(users => users.json()).toPromise()
  }

  create(user:any){
    return this._http.post('/api/users/create',user)
    .map(data => data.json()).toPromise()
  }
  
  login(user:any){
    return this._http.post('/api/users/login',user)
    .map(data => data.json()).toPromise()
  }

}
