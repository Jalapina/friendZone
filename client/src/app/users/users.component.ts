import { Component, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { FriendshipService } from '../_services/friendship.service'
import { StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import { element } from 'protractor';

@Component({
  selector: 'app-profile',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})

export class UsersComponent implements OnInit {

  // @ViewChild('myswing1') swingStack: SwingStackComponent;
  stackConfig: StackConfig;

  isClassVisible: false;
  cards: Array<any>;
  users
  recentCard: string = '';
  name
  bio
  blur
  hobbies
  item
  friend:any = {}
  constructor(private _userService:UserService, private _friendshipService:FriendshipService) { }

  user = JSON.parse(localStorage.getItem('user'));


  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this._userService.getUsers(this.user).subscribe(result => {
 
      this.cards = result['users']
    })
  }

  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    // this.addNewCards(1);
    if (like) {
      console.log("like")
      this.recentCard = removedCard._id;
      this.create(like,this.recentCard)
      console.log(this.recentCard);
    } else {
      console.log("No")      
      this.recentCard = removedCard._id;
      this.create(like,this.recentCard)  
      console.log(this.recentCard);
    }
  }

  create(like:any,id){
    this.friend.like = like
    this.friend.userId = this.user
    this.friend.id = id

    console.log("id",this.friend)
    this._friendshipService.create(this.friend)
    
  }

}
