import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  isClassVisible: false;
  itemsAsObjects = ["Running","Reading"]

  constructor(private _userService:UserService) { }

  ngOnInit() {
  }

  getUser(){
    // this._userService.getUser()
    // .then(user => user)
  }
  test(){
    console.log("Test is working")
  }

}
