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
  ngOnInit() {
  }
  compare(){
    console.log(this.user)
    if(this.user.password === this.user.confirm_password){
      this.isClassVisible = true
    }else{
      this.isClassVisible = false
    }
  }

  validation(){

    if(this.user.password === this.user.confirm_password){
      this.isClassVisible = true
    }else{
      this.isClassVisible = false
    }
    
  }

  create(){

    if(this.user.first_name && this.user.email && this.user.password && this.user.confirm_password){
      this.formActive = true
      this._userService.create(this.user)
      .subscribe(
        data =>{
          this._router.navigateByUrl('profile')
        },error=>{
          this.message = error.error.error
          console.log(error.error)
        }
      );
    }else{
      this.formActive = false
    }
  }

}
