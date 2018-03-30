import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  constructor( private messageService:MessageService) { }

  message:any = {}

  ngOnInit() {
    this.getMessages()
  }

  getMessages(){
    this.messageService.getMessages()
    .then(messages => messages)
  }
  sendMessage(){
    this.messageService.sendMessage(this.message)
    .then(status => this.getMessages())
  }

}
