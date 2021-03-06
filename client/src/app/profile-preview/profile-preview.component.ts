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
  loadingImages = false
  user:any = {
    hobbies: ''
  }

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.loadingImages = true
    this.userService.getUser(this.userId).subscribe(data=>{
      this.user = data['user']
      this.loadingImages = false
    })
  }

  calculateAge(birthday) {
    //check users age
    let ageInSec = Date.now() - new Date(birthday).getTime();
    let age = new Date(ageInSec);
    return Math.abs(age.getUTCFullYear() - 1970);
  }

}
