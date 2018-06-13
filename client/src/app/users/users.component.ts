import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  isClassVisible: false;

  constructor(private _userService:UserService) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    console.log("getUsers")
    this._userService.getUsers()
    // .then(user => user)
  }
  test(){
    console.log("Test is working")
  }

}
