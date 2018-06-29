import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map'

@Injectable()
export class FriendshipService {

  constructor(private _http:HttpClient) { }

  create(like:any){
    console.log(like)
    return this._http.post('/api/friendships',like).subscribe(data=>{
      console.log("friend",data)
    })
  }

}
