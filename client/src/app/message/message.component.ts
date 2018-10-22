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
  chat
  firstName
  sender
  friendId
  reciever

  ngOnInit() {
    this.getMessages()
  }

  getMessages(){
    
    this.messageService.getMessages(this.user,this.friend).subscribe(data=>{
      console.log(data)
      if(data['chat']){
        this.reciever = data['chat'][0].users[0].first_name
        this.sender = data['chat'][0].users[1].first_name
        this.chat = data['chat']
      }else{
        this.firstName = data['user'].first_name
        this.friendId = data['user']._id
      }
    });
  }

  sendMessage(){

    this.message.sender = this.user
    this.message.reciever = this.friend
    this.messageService.sendMessage(this.message)
    .subscribe(data=>{
      this.getMessages()
      this.message.message = ''
    });

  }

  unFriend(){
    this.friendshipService.unFriend(this.user,this.friend).subscribe(data=>{
      this._router.navigateByUrl('/friends');      
    })
  }

}
