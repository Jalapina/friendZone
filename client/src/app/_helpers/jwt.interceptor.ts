import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import { AuthenticateService } from '../_services/authenticate.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(public auth: AuthenticateService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let token = this.auth.getToken();
      // console.log("TOKEN",token)
      if(token){

        request = request.clone({
          setHeaders: { 
            Authorization: `${token}`
          }
          // headers: request.headers.set(`header`,token)
          
        })
        
        
      }
      return next.handle(request)
      .catch(err => { 
        return Observable.throw(err);
      });
    }

}
