import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';
import {TypeOfCourseService} from '../../../shared/services/type-of-course.service';
import {TypeOfCourse} from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

    courseForm: FormGroup;
    typesOfCourse: TypeOfCourse [];

    constructor(private route: ActivatedRoute, private router: Router, private descriptionOfPlanService: DescriptionOfPlanService,
                private typeOfCourseService: TypeOfCourseService) {
    }

    ngOnInit() {
        this.typeOfCourseService.getTypesOfCourse().subscribe((res: TypeOfCourse[]) => {
            this.typesOfCourse = res;
        } );
        this.courseForm = new FormGroup({
            description: new FormControl('', Validators.required),
            typeOfCourse: new FormControl([], Validators.required),
        });
    }

    onSubmit(form: NgForm) {
        console.log('Submitted!', form);
        this.descriptionOfPlanService.saveDescriptionOfPlan(form).subscribe(() => this.gotoCoursesList());
    }

    gotoCoursesList() {
        this.router.navigate(['/dictionaries/courses']);
    }

}
