import { Component, OnInit } from '@angular/core';
import { AuthenticateService as Auth } from '../_services/authenticate.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {

  constructor(private auth:Auth) { }

  ngOnInit() {
    this.auth.logout()    
  }

}
