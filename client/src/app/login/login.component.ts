import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService) { }
  user:any = {}
  
  ngOnInit() {
  }

  authenticate(){
    this._userService.authenticate(this.user);
  }

}
