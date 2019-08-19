import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../course.service';
import {Course} from '../course.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

    courseEditForm: FormGroup;
    id: number;

    constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) {
        this.courseEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getCourse(this.route.snapshot.params.id);
    }

    getCourse(id: number) {
        this.courseService.getCourse(id).subscribe(res => {
            console.log(res);
            this.courseEditForm.patchValue({
                shortCourseName: res.shortCourseName,
                courseName: res.courseName,
                numberOfHours: res.numberOfHours,
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            shortCourseName: new FormControl('', Validators.required),
            courseName: new FormControl('', Validators.required),
            numberOfHours: new FormControl(''), //поставить валидаторы?
        });
    }

    onSubmit() {
        const result: Course = Object.assign({}, this.courseEditForm.value);
        this.courseService.updateCourse(this.id, result)
            .subscribe(() => {console.log('Submitted!'); this.gotoCoursesList(); });
    }

    gotoCoursesList() {
        this.router.navigate(['/dictionaries/courses']);
    }

}
