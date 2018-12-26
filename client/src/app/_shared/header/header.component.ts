import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../_services/authenticate.service'
import { UserService } from '../../_services/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {

  constructor(private authenticateService:AuthenticateService, private userService:UserService) { }
  
  loggedIn:boolean
  notificationCss:boolean = false

  ngOnInit() {
    this.loggedIn = this.authenticateService.isLoggedIn()
    this.notification()
  }

  notification(){
    this.userService.hasNotification().subscribe(data=>{
      this.notificationCss = data["notification"]
    })
  }

}
