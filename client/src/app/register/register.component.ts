import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { AuthenticateService as Auth } from '../_services/authenticate.service'
import { Router } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private _userService:UserService, private _router:Router, private auth:Auth) { }
  
  isClassVisible:Boolean
  user:any = {}
  message = ""
  formActive: Boolean = false
  myform;
  datePicker: Boolean = true
  today = new Date();
  minAge = 18;
  ageValidation: Boolean = false
  loading = false

  ngOnInit() {
    this.auth.logout()    
  }
  
  validate(){
    
    if(this.user.first_name && this.user.email && this.user.password && this.user.confirm_password && this.user.birthday){
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

  ageValidate() {
    let ageInSec = Date.now() - new Date(this.user.birthday).getTime()
    let ageDate = new Date(ageInSec)
    let age = Math.abs(ageDate.getUTCFullYear() - 1970)
    if(age > 17){
      this.ageValidation = false
      
    }else{
      this.ageValidation = true
      this.message = "Must be 18 year's of age."
    }
  }

  validation(){ 

    if(this.user.password === this.user.confirm_password){
      if(this.user.password.length > 5 && this.user.password.length > 5){
        this.isClassVisible = true
        this.message = ""
      }else{
      this.message = "Password is too short"
      }
    }else{
      this.isClassVisible = false
      this.formActive = false
      this.message = "Password do not match"
    }
    
  }

  create(){
      this.loading = true
      this.formActive = true
      this._userService.create(this.user)
      .subscribe(
        data =>{
          this._router.navigateByUrl('profile')
        },error=>{
          this.message = error.error.message
        }
      );
    }

}
