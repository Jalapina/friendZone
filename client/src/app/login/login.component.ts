import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { AuthenticateService as Auth } from '../_services/authenticate.service'
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService, private _router:Router, private auth:Auth) { }
  
  user:any = {}
  message = ""
  formActive:Boolean = false
  
  ngOnInit() {
    this.auth.logout()
  }
  validate(){
    if(this.user.email && this.user.password){
      this.formActive = true
    }else{
      this.formActive = false
    }    
  }
  authenticate(){
    this._userService.authenticate(this.user)
    .subscribe(
      data=>{
       
        if(data['success'] === false){
          this._router.navigateByUrl('/login');

        }else{
          this._router.navigateByUrl('home');
        }
    },error=>{
      this.message = error.error.message
    }
  )
  }

}
