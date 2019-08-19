import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../course.model';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

    courses: Course [];
    constructor(private courseService: CourseService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.loadCourses();
    }

    loadCourses() {
        return this.courseService.getCourses()
            .subscribe((data: Course[]) => {
                this.courses = data;
            });
    }

    onDeleteCourse(course: Course) {
        this.courseService.deleteCourse(course.id).subscribe(() => {
            this.loadCourses();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }


}
