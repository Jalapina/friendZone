import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
@Component({
  selector: 'app-password-reset-confirmation',
  templateUrl: './password-reset-confirmation.component.html',
  styleUrls: ['./password-reset-confirmation.component.sass']
})
export class PasswordResetConfirmationComponent implements OnInit {

  constructor(private userService:UserService ) { }
  
  match: Boolean = false
  passwords:any = {}
  message
  success
  ngOnInit() {
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
    this.success = true
    // this.userService.resetPassword(this.passwords).subscribe(data=>{
    //   console.log(data)
    // })
  }

}
