import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService, private _router:Router) { }
  
  user:any = {}
  
  ngOnInit() {
    
  }

  authenticate(){
    
    this._userService.authenticate(this.user)
    .subscribe(data=>{
      this._router.navigateByUrl('home');
    })
  }

}
