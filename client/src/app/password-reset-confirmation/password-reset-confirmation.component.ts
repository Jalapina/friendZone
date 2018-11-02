import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'


@Component({
  selector: 'app-password-reset-confirmation',
  templateUrl: './password-reset-confirmation.component.html',
  styleUrls: ['./password-reset-confirmation.component.sass']
})
export class PasswordResetConfirmationComponent implements OnInit {

  constructor(private userService:UserService, private params:ActivatedRoute, private route:Router ) { }

  token = this.params.snapshot.params['id'];   
  
  match: Boolean = false
  passwords:any = {}
  message
  success
  user: any={
    first_name: '',
    image: [],
  }
  ngOnInit() {
    this.getUserWithToken()
  }

  getUserWithToken(){
    console.log(this.token)
    this.userService.getUserWithToken(this.token).subscribe(data=>{
      this.user = data["user"]
      console.log(this.user)
    });
  }

  passwordMatch(){

    if(this.passwords.password === this.passwords.confirm_password){
        
      if(this.passwords.password.length > 5 && this.passwords.password.length > 5){
      this.match = true
      this.message = ""
      }else{
      this.message = "Password is too short"
      }
    }else{
      this.message = "Password do not match"
      this.match = false
    }
  }

  resetPassword(){
    this.passwords._id = this.user._id
    this.userService.resetPassword(this.passwords).subscribe(data=>{
      this.success = true
      setTimeout(()=>{
        this.route.navigateByUrl('/login');
      }, 3000)
    });
  }
}
