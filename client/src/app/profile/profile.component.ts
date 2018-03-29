import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(private _userService:UserService) { }

  ngOnInit() {
  }

  getUser(){
    this._userService.getUser()
    .then(user => user)
  }
  test(){
    console.log("Test is working")
  }

}
