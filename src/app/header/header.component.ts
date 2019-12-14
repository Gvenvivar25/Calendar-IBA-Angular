import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;

  constructor( private router: Router,
               private authService: AuthenticationService) { }

  ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn;
  }

    logout() {
        this.authService.logout();
        this.router.navigate(['/sign-in']);
    }
// сделать нормальное получение роли
    get isAdminOrManager() {
     // const role = this.authService.getUserRole();
      const role = this.authService.userRole;
     // if (role === 'ROLE_ADMIN') { return true; } else { return false; }
      if (role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER') { return true; } else { return false; }
    }

    get isAdminOrManagerOrView() {
        // const role = this.authService.getUserRole();
        const role = this.authService.userRole;
        // if (role === 'ROLE_ADMIN') { return true; } else { return false; }
        if (role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER' || role === 'ROLE_VIEW') { return true; } else { return false; }
    }

    /*get isAdmin() {
        // const role = this.authService.getUserRole();
        const role = this.authService.userRole;
        if (role === 'ROLE_ADMIN') { return true; } else { return false; }
    }*/

}
