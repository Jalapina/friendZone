import { Component, OnInit } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { Router } from '@angular/router'
import { AuthenticateService } from '../_services/authenticate.service'
import { UserService } from '../_services/user.service'
import { Response } from '@angular/http/src/static_response';

TagInputModule.withDefaults({
  tagInput: {
      placeholder: 'Add a Hobby',
      
      // add here other default values for tag-input
  },
  dropdown: {
      displayBy: 'my-display-value',
  },
  
});

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  
  isClassVisible: false;
  itemsAsObjects = ['Running','Reading']
  user:any
  userInfo:any = {}
  name
  bio
  blur
  activity


  constructor(private authenticateService:AuthenticateService, private userService:UserService , private router:Router) { 
    this.user = JSON.parse(localStorage.getItem('user'));
    
  }

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    const userId = this.user
    this.userService.getUser(userId).subscribe( data =>{ 
      console.log(data,"data")
      this.name = data['user'].first_name
      
    })
  }

  updateUser(){
    console.log("Updating user",this.userInfo)
  }

  logout(){
    this.authenticateService.logout()
    this.router.navigateByUrl('/login')
  }

}
