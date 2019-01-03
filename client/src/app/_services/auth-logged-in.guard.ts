import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticateService } from './authenticate.service'

@Injectable()
export class AuthLoggedInGuard implements CanActivate {
  constructor(private authenticateService:AuthenticateService, private router:Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authenticateService.isLoggedIn()){
        this.router.navigateByUrl('/home')
        return false      
      }
      return true
      
    }
}
