import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MessageService } from '../_services/message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  constructor( private messageService:MessageService, private _params:ActivatedRoute) { }

  chatUserId = this._params.snapshot.params['id']; 
  user = JSON.parse(localStorage.getItem('user'));
  usersId = [this.chatUserId,this.user]
  message:any = {}
  chat:any = []
  
  ngOnInit() {
    // setInterval(()=>{this.getMessages()},5000)
    this.getMessages()
  }

  getMessages(){
    this.messageService.getMessages(this.user,this.chatUserId).subscribe(messages=>{
      console.log(messages['chat'][0].message.text)
      this.chat = messages['chat'][0].message.text
    })
  }
  sendMessage(){
    this.message.sender = this.user
    this.message.reciever = this.chatUserId
    console.log(this.message)
    this.messageService.sendMessage(this.message)
    .subscribe(data=>{
      console.log(data)
    })
  }

}
