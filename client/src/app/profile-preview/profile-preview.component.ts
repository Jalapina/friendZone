import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.sass']
})

export class ProfilePreviewComponent implements OnInit {

  constructor(private userService:UserService, private params:ActivatedRoute) { }

  userId = this.params.snapshot.params['id']; 
  user
  focus: Boolean = false

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.userService.getUser(this.userId).subscribe(data=>{
      this.user = data['user']
      if(this.user.blur){
        this.focus = true
      }
      console.log(this.user)
    })
  }

  calculateAge(birthday) {
    
    let ageInSec = Date.now() - new Date(birthday).getTime();
    let age = new Date(ageInSec);
    return Math.abs(age.getUTCFullYear() - 1970);
        
  }

}
