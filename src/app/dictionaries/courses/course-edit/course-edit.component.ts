import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Course, TypeOfCourse} from '../../../shared/models/course.model';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';

import {TypeOfCourseService} from '../../../shared/services/type-of-course.service';


@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})

export class CourseEditComponent implements OnInit {

    courseEditForm: FormGroup;
    id: number;
    typesOfCourse: TypeOfCourse [];

    constructor( private route: ActivatedRoute, private router: Router,
                 private descriptionOfPlanService: DescriptionOfPlanService, private typeOfCourseService: TypeOfCourseService) {
        this.courseEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.typeOfCourseService.getTypesOfCourse().subscribe((res: TypeOfCourse[]) => {
            this.typesOfCourse = res;
        } );
        this.getCourse(this.route.snapshot.params.id);
    }

    getCourse(id: number) {
        this.descriptionOfPlanService.getDescriptionOfPlan(id).subscribe(res => {
            console.log(res);
            this.courseEditForm.patchValue({
                description: res.description,
                typeOfCourse: res.typeOfCourse.id,
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            description: new FormControl('', Validators.required),
            typeOfCourse: new FormControl([], Validators.required),
        });
    }

    onSubmit() {
        const result: Course = Object.assign({}, this.courseEditForm.value);
        this.descriptionOfPlanService.updateDescriptionOfPlan(this.id, result)
            .subscribe(() => {console.log('Submitted!'); this.gotoCoursesList(); });
    }

    gotoCoursesList() {
        this.router.navigate(['/dictionaries/courses']);
    }

}
