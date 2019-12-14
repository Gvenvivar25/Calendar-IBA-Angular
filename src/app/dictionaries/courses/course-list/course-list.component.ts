import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course, DescriptionOfPlan} from '../../../shared/models/course.model';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';
import {AuthenticationService} from '../../../shared/services/authentication.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

    id: number;
    courses: DescriptionOfPlan [];
    rowSelected: number;

    constructor(private descriptionOfPlanService: DescriptionOfPlanService, private router: Router, private route: ActivatedRoute,
                private authService: AuthenticationService) {
        this.rowSelected = -1;
    }

    ngOnInit() {
        this.loadCourses();
    }

    get isAdmin() {
        const role = this.authService.userRole;
        if (role === 'ROLE_ADMIN') { return true; } else { return false; }
    }

    get isAdminOrManager() {
        const role = this.authService.userRole;
        if (role === 'ROLE_ADMIN' || role === 'ROLE_MANAGER') { return true; } else { return false; }
    }

    loadCourses() {
        return this.descriptionOfPlanService.getDescriptionOfPlans()
            .subscribe((data: DescriptionOfPlan[]) => {
                this.courses = data;
            });
    }

    onSelect(idCourse: number): void {
        if (this.rowSelected === -1) {
            this.rowSelected = idCourse;
        } else {
            if (this.rowSelected === idCourse) {
                this.rowSelected = -1;
            } else {
                this.rowSelected = idCourse;
            }
        }
    }

    onDeleteCourse(course: Course) {
        this.descriptionOfPlanService.deleteDescriptionOfPlan(course.id).subscribe(() => {
            this.loadCourses();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }
}
