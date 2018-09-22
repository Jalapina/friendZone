import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticateService } from './authenticate.service'

@Injectable()
export class GuardAuthenticationService implements CanActivate {

  constructor(private authenticateService:AuthenticateService, private router:Router) { }

  canActivate(): boolean{
    if(!this.authenticateService.isLoggedIn()){
      this.router.navigateByUrl('/')
      return false
    }
    return true
  }

}