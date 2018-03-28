import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

@Injectable()
export class MessageService {

  constructor(private _http: Http) { }

}
