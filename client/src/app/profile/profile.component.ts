import { Component, OnInit } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { Router } from '@angular/router'
import { AuthenticateService } from '../_services/authenticate.service'
import { UserService } from '../_services/user.service'
import { Response } from '@angular/http/src/static_response';
import { concat } from 'rxjs/operator/concat';

TagInputModule.withDefaults({
  
  tagInput: {
      placeholder: 'Add a Hobby',
      secondaryPlaceholder: 'Add a Hobby',
      
      maxItems: 10,
  }
});



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  
  isClassVisible: false;
  items: string[] = []
  user:any
  userInfo:any = {}
  bool = "hello"
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
      // console.log(data,"data")
      this.name = data['user'].first_name
      this.items = data['user'].hobbies
      this.userInfo.blur = data['user'].blur
      this.userInfo.bio = data['user'].bio
    })
  }

  editUser(){
    this.userInfo._id = this.user
    this.userInfo.hobbies = this.items
    console.log("Updating user",this.userInfo)
    this.userService.editUser(this.userInfo).subscribe(data =>{
      console.log("updated user", data)
      this.getUser()
    })
  }

  logout(){
    this.authenticateService.logout()
    this.router.navigateByUrl('/login')
  }

}
