import { Component, OnInit } from '@angular/core';
import {AddWorkOfTeacherService} from '../add-work-of-teacher.service';
import {AddWorkOfTeacher} from '../add-work-of-teacher.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';

@Component({
  selector: 'app-add-work-list',
  templateUrl: './add-work-list.component.html',
  styleUrls: ['./add-work-list.component.scss']
})
export class AddWorkListComponent implements OnInit {
  addWorks: AddWorkOfTeacher[];
    startDate;
    endDate;

  constructor(private addWorkOfTeacherService: AddWorkOfTeacherService, private router: Router, private route: ActivatedRoute,
              private authService: AuthenticationService) { }

  ngOnInit() {
      const date = new Date();
      this.startDate = new Date(date.getFullYear(), date.getMonth() - 1, 2).toISOString().split('T')[0];
      this.endDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
      console.log(this.startDate);
      console.log(this.endDate);
      this.loadAddWorks();
  }

    get isAdminOrManager() {
        const role = this.authService.userRole;
        if (role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER') { return true; } else { return false; }
    }

    loadAddWorks() {
        return this.addWorkOfTeacherService.getAllAddWork(this.startDate, this.endDate)
            .subscribe((data: AddWorkOfTeacher[]) => {
                this.addWorks = data;
            });
    }

    onDeleteAddWork(addWork: AddWorkOfTeacher) {
        this.addWorkOfTeacherService.deleteAddWork(addWork.id).subscribe(() => {
            this.loadAddWorks();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }

}
