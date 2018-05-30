import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private _userService:UserService, private _router:Router) { }
  
  user:any = {}

  ngOnInit() {
  }

  create(){
    this._userService.create(this.user)
    .subscribe(
      data =>{
        this._router.navigateByUrl('home')
      });
  }

}
