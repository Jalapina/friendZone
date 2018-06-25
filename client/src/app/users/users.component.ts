import { Component, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { StackConfig, Stack, Card, ThrowEvent, DragEvent, SwingStackComponent, SwingCardComponent} from 'angular2-swing';

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

  // onItemMove(element, x, y, r) {
  //   var color = '';
  //   var abs = Math.abs(x);
  //   let min = Math.trunc(Math.min(16*16 - abs, 16*16));
  //   let hexCode = this.decimalToHex(min, 2);
    
    // if (x < 0) {
    //   color = '#FF' + hexCode + hexCode;
    // } else {
    //   color = '#' + hexCode + 'FF' + hexCode;
    // }
    
    // element.style.background = color;
    // element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  // }

  constructor(private _userService:UserService) { 
    
    // this.stackConfig = {
    //   throwOutConfidence: (offsetX, offsetY, element) => {
    //     return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
    //   },
    //   transform: (element, x, y, r) => {
    //     this.onItemMove(element, x, y, r);
    //   },
    //   throwOutDistance: (d) => {
    //     return 800;
    //   }
    // };

  }


  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this._userService.getUsers().subscribe(result => {
      console.log(result['users'])
      this.cards = result['users']
      // for (let val of this.users) {
      //   this.cards.push(val);
      // }
    })
  }

  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    // this.addNewCards(1);
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.email;
    } else {
      this.recentCard = 'You disliked: ' + removedCard.email;
    }
  }

  // decimalToHex(d, padding) {
  //   var hex = Number(d).toString(16);
  //   padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    
  //   while (hex.length < padding) {
  //     hex = "0" + hex;
  //   }
    
  //   return hex;
  // }

}
