import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map'

@Injectable()
export class FriendshipService {

  constructor(private _http:HttpClient) { }

  create(like:any){
    return this._http.post('/api/friendships/create',like).subscribe()
  }

  getFriends(){
    return this._http.get('/api/friendships/')
  }
 
  unFriend(friend){
    return this._http.delete('/api/friendships/'+friend+'/delete')
  }
  
}
