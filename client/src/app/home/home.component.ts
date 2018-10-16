import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { AuthenticateService } from '../_services/authenticate.service'
import { Router } from '@angular/router';
import { element } from 'protractor';
import { setTimeout } from 'timers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  constructor(private _userService:UserService, private _authenticateService:AuthenticateService,private route:Router) { 
  }

  user
  coordinates:any = {}

  ngOnInit() {
    this.userInfo()
    this.getLocation()
  }

  userInfo(){
    this._authenticateService.getUserInfo()
  }

  getLocation(){
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        setTimeout(()=>{
          this.coordinates.latitude = position.coords.latitude
          this.coordinates.longitude = position.coords.longitude
          this.user = JSON.parse(localStorage.getItem('user'))   
          this._userService.userLocation(this.coordinates,this.user)  
        },0)
      });      
    }else{
      console.log("GeoLocation is not supported on this browser")
    }
  }
  

}
