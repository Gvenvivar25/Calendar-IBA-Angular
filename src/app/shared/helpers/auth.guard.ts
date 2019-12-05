import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authService: AuthenticationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //  const myRole = this.authService.getUserRole();
        const myRole = this.authService.userRole;
        const currentToken = this.authService.currentToken;
        const url: string = state.url;

        if (currentToken) {
            this.authService.setLoggedIn(true);
          //  console.log(myRole);
            if (next.data.roles && next.data.roles.indexOf(myRole) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/403']);
                return false;
            }
            return true;
            // authorised so return true
            /*this.authService.setLoggedIn(true);
            return true;*/
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/sign-in'], { queryParams: { returnUrl: url }});
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

    /*private checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.authService.redirectToUrl = url;
        this.router.navigate(['/sign-in']);
        return false;
    }*/

    /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentToken = sessionStorage.getItem('token');
        if (currentToken) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url }});
        return false;
    }*/
}
