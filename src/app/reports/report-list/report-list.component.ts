import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';


@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

    constructor(private authService: AuthenticationService) {    }

    ngOnInit() {

    }
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

    get isAdminOrManagerOrViewOrUser() {
        // const role = this.authService.getUserRole();
        const role = this.authService.userRole;
        // if (role === 'ROLE_ADMIN') { return true; } else { return false; }
        if (role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER' || role === 'ROLE_VIEW' || role === 'ROLE_USER') { return true; } else { return false; }
    }

    get isAdminOrManagerOrUser() {
        // const role = this.authService.getUserRole();
        const role = this.authService.userRole;
        // if (role === 'ROLE_ADMIN') { return true; } else { return false; }
        if (role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER' || role === 'ROLE_USER') { return true; } else { return false; }
    }

}

