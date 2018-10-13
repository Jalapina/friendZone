import { Component, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { FriendshipService } from '../_services/friendship.service'
import { ActivatedRoute } from '@angular/router'
import { StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import { element } from 'protractor';
import { userInfo } from 'os';

@Component({
  selector: 'app-profile',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})

export class UsersComponent implements OnInit {

  stackConfig: StackConfig;
  isClassVisible: false;
  cards: Array<any>;
  users
  recentCard: string = '';
  friend:any = {}
  data

  constructor(private _userService:UserService, private _friendshipService:FriendshipService, private params:ActivatedRoute) { }

  user = JSON.parse(localStorage.getItem('user'));
  term = this.params.snapshot.params['term']; 

  ngOnInit() {
    this.getUsers()
    console.log(this.term)
    
  }

  calculateAge(birthday) {

    let ageInSec = Date.now() - new Date(birthday).getTime();
    let age = new Date(ageInSec);
    return Math.abs(age.getUTCFullYear() - 1970);
    
  }

  getUsers(){

    this.data = {
      user:this.user,
      term:this.term
    }

    this._userService.getUsers(this.data).subscribe(result => {
      this.cards = result['users'];
    });

  }

  voteUp(like: boolean) {

    let removedCard = this.cards.pop();

    if (like) {
      this.recentCard = removedCard._id;
      this.create(like,this.recentCard)
      
    } else {
      this.recentCard = removedCard._id;
      this.create(like,this.recentCard);
    }

  }

  create(like:any,id){

    this.friend.like = like
    this.friend.userId = this.user
    this.friend.id = id
    this.friend.activity = this.term

    this._friendshipService.create(this.friend);
    
  }

}
