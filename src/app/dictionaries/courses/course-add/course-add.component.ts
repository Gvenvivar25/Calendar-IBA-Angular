import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

    courseForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {
    }

    ngOnInit() {
        this.courseForm = new FormGroup({
            shortCourseName: new FormControl('', Validators.required),
            courseName: new FormControl('', Validators.required),
            numberOfHours: new FormControl(''), //поставить валидаторы?
        });
    }

    onSubmit(form: NgForm) {
        console.log('Submitted!', form);
        this.courseService.saveCourse(form).subscribe(() => this.gotoCoursesList());
    }

    gotoCoursesList() {
        this.router.navigate(['/dictionaries/courses']);
    }

}
