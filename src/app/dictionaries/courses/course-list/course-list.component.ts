import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course, DescriptionOfPlan} from '../course.model';
import {CourseService} from '../course.service';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

    id: number;
    courses: DescriptionOfPlan [];
    rowSelected: number;

    constructor(private descriptionOfPlanService: DescriptionOfPlanService, private router: Router, private route: ActivatedRoute) {
        this.rowSelected = -1;
    }

    ngOnInit() {
        this.loadCourses();
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
