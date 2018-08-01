import { Component, OnInit } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { Router } from '@angular/router'
import { AuthenticateService } from '../_services/authenticate.service'
import { UserService } from '../_services/user.service'
import { Category } from './Category'

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
  categories = [
    new Category(1, 'Music' ),
    new Category(2, 'Bar' ),
    new Category(3, 'Gym' ),
    new Category(4, 'Food'),
 ];
  classVisible: false
  userIsActive:boolean
  items: string[] = []
  userInfo:any = {}
  bool = "hello"
  userActivation:any = {}
  name
  bio
  blur
  activity
  user = JSON.parse(localStorage.getItem('user'));  

  constructor(private authenticateService:AuthenticateService, private userService:UserService , private router:Router) { 
      
  }

  ngOnInit() {
    this.getUser()
  }

  userActive(){
    this.userIsActive = !this.userIsActive
    console.log(this.userIsActive)
    this.userActivation.active = this.userIsActive
    this.userActivation.user = this.user

    this.userService.userActivate(this.userActivation)
  }

  getUser(){
    const userId = this.user
    this.userService.getUser(userId).subscribe( data =>{ 
      console.log(data,"data")
      this.name = data['user'].first_name
      this.items = data['user'].hobbies
      this.userInfo.blur = data['user'].blur
      this.userInfo.bio = data['user'].bio
      this.userIsActive = data['user'].active
      // if(data['user'].activity){}
      this.activity = "Bar" 
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
