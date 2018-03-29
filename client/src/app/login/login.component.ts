import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { User } from './user'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService) { }

  ngOnInit() {
  }

  login(user:User){
    this._userService.login(user)
  }

}
