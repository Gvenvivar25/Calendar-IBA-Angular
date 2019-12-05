import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpInterceptor, HttpEvent} from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs';



@Injectable(
    {
        providedIn: 'root'
    }
)
export class JwtInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = request;
        const currentToken = this.auth.getToken();
       // console.log(currentToken);
      //  console.log(request);
        if (currentToken) {
            authReq = request.clone( {
                setHeaders: {
                    Authorization: `Bearer ${currentToken}`
                }
            });
        }
      //  console.log(authReq);
        return next.handle(authReq);
    }
}
