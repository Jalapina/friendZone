import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MessageService } from '../_services/message.service'
// import {  }
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
  chat
  firstName
  sender
  reciever

  @ViewChild("chatbox") chatbox;
  
  ngOnInit() {
    this.getMessages()
    // console.log(this.chatbox.nativeElement)
  }

  getMessages(){
    this.messageService.getMessages(this.user,this.chatUserId).subscribe(messages=>{
      if(messages['chat'].length > 0){
        console.log(messages['chat'])
        this.sender = messages['chat'][0].users[0].first_name
        this.reciever = messages['chat'][0].users[1].first_name
        this.chat = messages['chat']
      }
      
    })
  }
  sendMessage(){
    this.message.sender = this.user
    this.message.reciever = this.chatUserId
    this.messageService.sendMessage(this.message)
    .subscribe(data=>{
      this.getMessages()
      this.message.message = ''
    })
  }

}
