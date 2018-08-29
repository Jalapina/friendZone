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
  
  isClassVisible:Boolean
  user:any = {}
  message = ""
  formActive: Boolean = false
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  myform;

  ngOnInit() {
  }
  
  validate(){
    if(this.user.first_name && this.user.email && this.user.password && this.user.confirm_password){
      this.formActive = true
      if(this.user.password === this.user.confirm_password){
      this.isClassVisible = true
      }else{
      this.isClassVisible = false
      }
    }else{
      this.formActive = false
    }    
  }

  validation(){ 
    console.log(this.user.password.length)

    if(this.user.password === this.user.confirm_password && this.user.password.length > 5 && this.user.password.length > 5){
      this.isClassVisible = true
    }else{
      this.isClassVisible = false
      this.formActive = false
    }
    
  }

  create(){

      this.formActive = true
      this._userService.create(this.user)
      .subscribe(
        data =>{
          this._router.navigateByUrl('profile')
        },error=>{
          this.message = error.error.message
          console.log(error.error)
        }
      );
    }

}
