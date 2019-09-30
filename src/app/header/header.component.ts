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

}
