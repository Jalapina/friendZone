import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../_services/friendship.service'
import { setTimeout } from 'timers';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})

export class FriendsComponent implements OnInit {

  constructor(private friendshipService:FriendshipService) { }
  
  friendList = []
  user
  friendsWithMessages
  friendsWithOutMessages

  ngOnInit() {
    this.getFriends()
  }

  getFriends(){
    this.friendshipService.getFriends().subscribe(data=>{
      this.friendsWithMessages = data['friendsWithMessages']
      this.friendsWithOutMessages = data['friendsWithOutMessages']
    })
  }

  unFriend(friend){
    this.friendshipService.unFriend(friend).subscribe(data=>{
      this.getFriends()
    })
  }

}
