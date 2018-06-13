import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
// import { User } from '../login/user'

@Injectable()

export class UserService {

  constructor(private _http: HttpClient) { }

  authenticate(user:any){
    
    return this._http.post('/api/users/authenticate',user)
    .map((data) => {
      const token = data['token']
      localStorage.setItem('token', token);      
    })
    // .catch(err => console.log(err))
  }

  create(user:any){
    
    return this._http.post('/api/users/create',user)
    .map((data) => {
      const token = data['token'];
      localStorage.setItem('token', token); 
    });

  }

  getUsers(){
    console.log("getusers service")
    return this._http.get('/api/users/users').subscribe(data => {
      console.log(data);
    });
    // .map(data => data.json()).toPromise();
    // .map((data) => {
    //   console.log(data);
    // });
  }

  getUser(){
    return this._http.get('/api/users/:id')
    .map((data) => {
      console.log(data);
    });
  }  

}
