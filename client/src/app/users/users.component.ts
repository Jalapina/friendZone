import { Component, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { FriendshipService } from '../_services/friendship.service'
import { ActivatedRoute } from '@angular/router'
import { StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import { element } from 'protractor';
import { userInfo } from 'os';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-profile',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})

export class UsersComponent implements OnInit {

  stackConfig: StackConfig;
  isClassVisible: false;
  cards = []
  users
  recentCard: string = '';
  friend:any = {}
  loading = false
  data
  message

  constructor(private _userService:UserService, private _friendshipService:FriendshipService, private params:ActivatedRoute) { }

  user 
  term = this.params.snapshot.params['term']; 
  userCord

  ngOnInit() {
    this.getUsers()
  }

  calculateAge(birthday) {

    let ageInSec = Date.now() - new Date(birthday).getTime();
    let age = new Date(ageInSec);
    return Math.abs(age.getUTCFullYear() - 1970);
    
  }

  getUsers(){
    this.loading = true
    this._userService.getUsers(this.term)
    .subscribe(result => {
      if(result['users'].length > 0){
        this.loading = false
        this.cards = result['users'];
        this.userCord = result['userCordinates']
        this.cards.forEach(user=>{
          let distance = this.getDistance(user.latitude,user.longitude)
          let age = this.calculateAge(user.birthday)
          user.birthday = age
          user.distance = distance
      });
      
      }else{
        this.loading = true
        this.message = "Theirs nobody here!!"
      }
      
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

  rad(x){
    return x * Math.PI / 180;
  };

  getDistance(latitude, longitude){
    
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = this.rad(this.userCord.latitude - latitude);
    let dLong = this.rad(this.userCord.longitude - longitude);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
      Math.cos(this.rad(this.userCord.latitude) * Math.cos(this.rad(latitude))) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    let mile = d * 0.00062137

    return Math.floor(mile)
    
  };

  create(like:any,id){

    this.friend.status = like
    this.friend.userId = this.user
    this.friend.id = id
    this.friend.activity = this.term

    this._friendshipService.create(this.friend);
    
  }

}
