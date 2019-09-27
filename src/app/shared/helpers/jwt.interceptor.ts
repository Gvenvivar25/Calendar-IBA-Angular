import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';



@Injectable(
    {
        providedIn: 'root'
    }
)
export class JwtInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let authReq = request;
        const token = this.auth.getToken();
        console.log(token);
        console.log(request);
        if (token != null) {
            authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });

        }
        console.log(authReq);
        return next.handle(authReq);
    }
}
