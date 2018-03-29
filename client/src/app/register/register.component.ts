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
  
  user:any = {}

  ngOnInit() {
  }

  create(){
    this._userService.create(this.user)
  }

}
