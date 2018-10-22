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
    return this._http.put('/api/users/useractivation',userActivation).subscribe()
  }

  imageUpload(imageFile){
    return this._http.put('/api/users/images/',imageFile)
  }

  imageDelete(imageFile){
    return this._http.delete('/api/users/images/'+imageFile)
  }

  getUsers(term){
    return this._http.get('/api/users/'+term+'/activity')
  }

  editUser(userInfo){
    return this._http.put('/api/users/edit',userInfo).subscribe()
  }

  getUser(id){
    return this._http.get('/api/users/'+id)
  }

  getUserName(id){
    return this._http.get('/api/users/'+id+'/name')
  }

  deleteUser(id){
    return this._http.delete('/api/users/delete')
  }

  userLocation(coordinates){
    return this._http.put('/api/users/setlocation',coordinates).subscribe()
  }
  
}
