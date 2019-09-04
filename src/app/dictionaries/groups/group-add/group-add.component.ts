import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../group.service';
import {TypeOfCourse, TypeOfEducation} from '../group.model';
import {DescriptionOfPlan} from '../../courses/course.model';
import {TypeOfCourseService} from '../../../shared/services/type-of-course.service';
import {TypeOfEducationService} from '../../../shared/services/type-of-education.service';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

    groupForm: FormGroup;
    typesOfCourse: TypeOfCourse [];
    typesOfEducation: TypeOfEducation [];
    descriptionsOfPlan: DescriptionOfPlan [];

    constructor(private route: ActivatedRoute, private router: Router,
                private groupService: GroupService, private typeOfCourseService: TypeOfCourseService,
                private typeOfEducationService: TypeOfEducationService, private descriptionOfPlanService: DescriptionOfPlanService) {
    }

    ngOnInit() {
        this.typeOfCourseService.getTypesOfCourse().subscribe((res: TypeOfCourse[]) => {
            this.typesOfCourse = res;
        } );

        this.typeOfEducationService.getTypesOfEducation().subscribe((res: TypeOfEducation[]) => {
            this.typesOfEducation = res;
        } );

        this.descriptionOfPlanService.getDescriptionOfPlans().subscribe((res: DescriptionOfPlan[]) => {
            this.descriptionsOfPlan = res;
        } );


        this.groupForm = new FormGroup({
            groupName: new FormControl('', Validators.required),
            typeOfCourse: new FormControl([], Validators.required),
            typeOfEducation: new FormControl([], Validators.required),
            id_descriptionOfPlan: new FormControl([], Validators.required),
            numberOfSubgroup: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
        });
    }

    onSubmit(form: NgForm) {
        console.log('Submitted!', form);
        this.groupService.saveGroup(form).subscribe(() => this.gotoGroupsList());
    }

    gotoGroupsList() {
        this.router.navigate(['/dictionaries/groups']);
    }

}
