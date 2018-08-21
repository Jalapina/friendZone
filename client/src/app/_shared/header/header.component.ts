import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../_services/authenticate.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticateService:AuthenticateService) { }
  
  loggedIn:boolean

  ngOnInit() {
    this.loggedIn = this.authenticateService.isLoggedIn()
  }

}
