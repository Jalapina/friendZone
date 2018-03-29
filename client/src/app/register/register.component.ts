import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { User } from './user'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private _userService:UserService) { }

  ngOnInit() {
  }

  register(user:User){
    this._userService.create(user)
  }

}
