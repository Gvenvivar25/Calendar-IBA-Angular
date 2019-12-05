import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Department} from '../../../shared/models/department.model';
import {DepartmentService} from '../../../shared/services/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

    departments: Department [];
    constructor(private departmentService: DepartmentService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this. loadDepartments();
    }

    loadDepartments() {
        return this.departmentService.getDepartments()
            .subscribe((data: Department[]) => {
                this.departments = data;
            });
    }

    onDeleteDepartment(department: Department) {
        this.departmentService.deleteDepartment(department.id).subscribe(() => {
            this.loadDepartments();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }
}
