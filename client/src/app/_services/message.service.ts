import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(private _http: HttpClient) { }

  getMessages(reciever){
    return this._http.get('/api/messages/'+reciever)
  }

  sendMessage(message:any){
    return this._http.post('/api/messages/create',message)
  }

  readMessage(messageId:any){
    console.log(messageId, "service")
    
    return this._http.put('/api/messages/read',messageId).subscribe()
  }

}
