import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit {

  constructor(private userService:UserService) { }
  user = JSON.parse(localStorage.getItem('user'));
  friendList = []

  ngOnInit() {
    this.friends()
  }

  friends(){
    this.userService.getFriends(this.user).subscribe(data=>{
      this.friendList = data['users']
      console.log(this.friendList)
    })
  }

}
