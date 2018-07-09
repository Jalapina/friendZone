import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()

export class UserService {

  constructor(private _http: HttpClient) { }

  authenticate(user:any){
    
    return this._http.post('/api/users/authenticate',user)
    .map((data) => {
      const token = data['token']
      localStorage.setItem('token', token);     
      return data 
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

  userActivate(userActivation){
    console.log(userActivation)
    return this._http.put('/api/users/useractivation',userActivation).subscribe()
  }

  getUsers(id){
    return this._http.get('/api/users/users/'+id)
  }

  editUser(userInfo){
    return this._http.put('/api/users/edit',userInfo)
  }

  getUser(id){
    return this._http.get('/api/users/'+ id)
  }

  getFriends(id){
    return this._http.get('/api/friendships/'+id)
  }

}
