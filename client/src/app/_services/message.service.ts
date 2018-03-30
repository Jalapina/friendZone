import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

@Injectable()
export class MessageService {

  constructor(private _http: Http) { }

  getMessages(){
    return this._http.get('/api/getMessages/')
    .map(messages => messages.json()).toPromise()
  }

  sendMessage(message:any){
    return this._http.post('/api/createMessage',message)
    .map(data => data.json()).toPromise()
  }

}
