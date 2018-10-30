import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.sass']
})
export class PasswordResetComponent implements OnInit {
  
  errorMessages
  user: any = {}
  status: boolean = false
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  passwordResetRequest(){
    this.userService.passwordResetRequest(this.user).subscribe(data=>{
      console.log(data)
      if(data["message"]){
        this.errorMessages = data["message"]
      }else{
        this.status = true
      }
    })
  }

}
