import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService, private _router:Router) { }
  
  user:any = {}
  message = ""

  ngOnInit() {
    
  }

  authenticate(){
    this._userService.authenticate(this.user)
    .subscribe(
      data=>{
        console.log("response",data)
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
