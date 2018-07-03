import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(private _http: HttpClient) { }

  getMessages(sender,reciever){
    return this._http.get('/api/messages/'+sender+'/'+reciever)
  }

  sendMessage(message:any){
    return this._http.post('/api/messages/create',message)
  }

}
