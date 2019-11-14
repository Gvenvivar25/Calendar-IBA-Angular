import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-page403',
  templateUrl: './page403.component.html',
  styleUrls: ['./page403.component.scss']
})
export class Page403Component implements OnInit {

    constructor(private router: Router, private authService: AuthenticationService) { }

    ngOnInit() {
    }

    gotoMainPage() {
        if (this.authService.userRole === 'ROLE_USER') {
            this.router.navigate(['/reports/timetable-teacher']);
        } else {
            this.router.navigate(['/main']); }
    }

}
