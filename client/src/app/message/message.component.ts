import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MessageService } from '../_services/message.service'
import { FriendshipService } from '../_services/friendship.service'
import { UserService } from '../_services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  constructor( private messageService:MessageService, private userService:UserService , private _router:Router, private _params:ActivatedRoute, private friendshipService:FriendshipService) { }

  friend = this._params.snapshot.params['id']; 
  activity = this._params.snapshot.params['term']; 
  user
  usersId = [this.friend,this.user]
  message:any = {}
  chat = []
  firstName
  sender
  friendId
  reciever
  messageId:any = {}

  ngOnInit() {
    this.getMessages()
  }

  getMessages(){
    this.messageService.getMessages(this.friend).subscribe(data=>{
      if(data['chat']){
        this.user = data['user']
        this.reciever = data['chat'][0].users[0].first_name
        this.sender = data['chat'][0].users[1].first_name
        this.chat = data['chat']
        if(this.user != this.chat[this.chat.length-1].sender._id){
          this.readMessage()
        }
      }else{
        this.chat = undefined
        this.firstName = data['user'].first_name
        this.friendId = data['user']._id
      }
    });
  }

  sendMessage(){
    this.message.reciever = this.friend
    this.messageService.sendMessage(this.message)
    .subscribe(data=>{
      this.getMessages()
      this.message.message = ''
    });
  }

  readMessage(){
    if(!this.chat[this.chat.length-1].read){
      this.messageId._id = this.chat[this.chat.length-1]._id
      this.messageService.readMessage(this.messageId)
    }
    
  }

  unFriend(){
    this.friendshipService.unFriend(this.friend).subscribe(data=>{
      this._router.navigateByUrl('/friends');      
    })
  }
}
