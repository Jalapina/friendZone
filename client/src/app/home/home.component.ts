import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { AuthenticateService } from '../_services/authenticate.service'
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private _userService:UserService, private _authenticateService:AuthenticateService,private route:Router) { 
  }

  ngOnInit() {
      this.userInfo()
  }

  userInfo(){
    this._authenticateService.getUserInfo()
  }
  

}
