import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { AuthenticateService } from '../_services/authenticate.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  
  user

  constructor(private _userService:UserService, private _authenticateService:AuthenticateService,private route:Router) { 
    this.user = (localStorage.getItem('token'));
  }

  ngOnInit() {
    
    // console.log("Localstorage",this.user.token)

    if(this._authenticateService.isLoggedIn()){
        this.userInfo()
        
  
    }else{
      this.route.navigateByUrl('/')
    }
  }

  userInfo(){
    this._authenticateService.getUserInfo()
    .subscribe(data =>{
      console.log("data",data['first_name'])
      if(data['first_name'] === undefined ){
        this.route.navigateByUrl('/')        
      }
    })
  }

}
