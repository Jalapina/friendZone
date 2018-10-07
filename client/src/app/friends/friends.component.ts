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
  user = JSON.parse(localStorage.getItem('user'));
  friendList = []
  friendsWithMessages
  friendsWithOutMessages

  ngOnInit() {
    this.getFriends()
  }

  getFriends(){
    this.friendshipService.getFriends(this.user).subscribe(data=>{
      this.friendsWithMessages = data['friendsWithMessages']
      this.friendsWithOutMessages = data['friendsWithOutMessages']   
      console.log(this.friendsWithOutMessages)
    })
  }

  unFriend(friend){
    this.friendshipService.unFriend(this.user,friend).subscribe(data=>{
      this.getFriends()
    })
  }

}
