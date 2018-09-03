import { Component, OnInit } from '@angular/core';
import { TagInputModule } from 'ngx-chips';
import { Router } from '@angular/router'
import { AuthenticateService } from '../_services/authenticate.service'
import { UserService } from '../_services/user.service'
import { Category } from './Category'
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

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
    new Category(3, 'Physical'),
    new Category(4, 'Food'),
    new Category(5, 'Cinema'),
 ];
  classVisible: false
  placeHolder: boolean = true
  userIsActive:boolean
  items: string[] = []
  userInfo:any = {}
  bool = "hello"
  userActivation:any = {}
  name
  bio
  blur
  activity
  userId
  userImage

  constructor(private authenticateService:AuthenticateService, private userService:UserService , private router:Router) { 
      
  }

  ngOnInit() {
    this.setUserId();
    setTimeout(()=>{
      this.getUser()
    }, 300)
  }

  
  imageUpload(event) {
    this.userService.imageUpload(event).subscribe(data =>{
      
    })
  }

  userActive(){
    this.userIsActive = !this.userIsActive
    this.userActivation.active = this.userIsActive
    this.userActivation.user = this.userId
    this.userService.userActivate(this.userActivation)
  }

  selectedActivity(activity:String){
    this.activity = activity
  }

  checkActivty(){
    if(this.activity){
      this.placeHolder = false
    }
  }

  setUserId(){
    this.authenticateService.getUserInfo()
  }

  getUser(){
    this.userId = JSON.parse(localStorage.getItem('user'))
    this.userService.getUser(this.userId).subscribe( data =>{ 
      this.name = data['user'].first_name
      this.items = data['user'].hobbies
      this.userInfo.blur = data['user'].blur
      this.userInfo.bio = data['user'].bio
      this.userIsActive = data['user'].active
      if(data['user'].activity){
        this.placeHolder = false
        this.activity = data['user'].activity
      }
    })
  }

  private editUser(){
    this.userInfo._id = this.userId
    this.userInfo.activity = this.activity
    this.userInfo.hobbies = this.items
    this.userService.editUser(this.userInfo)
    setTimeout(()=>{
      this.getUser()
    }, 1000)
  }

  logout(){
    this.authenticateService.logout()
    this.router.navigateByUrl('/login')
  }

}
