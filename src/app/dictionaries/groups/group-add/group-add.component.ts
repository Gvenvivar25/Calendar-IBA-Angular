import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../group.service';
import {Group, TypeOfEducation} from '../group.model';
import {DescriptionOfPlan, DescriptionOfPlanDto} from '../../courses/course.model';
import {TypeOfEducationService} from '../../../shared/services/type-of-education.service';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

    groupForm: FormGroup;
    typesOfEducation: TypeOfEducation [];
    descriptionsOfPlan: DescriptionOfPlanDto [];
    descriptionOfPlanDto: DescriptionOfPlan;
    group: Group;

    constructor(private route: ActivatedRoute, private router: Router,
                private groupService: GroupService,
                private typeOfEducationService: TypeOfEducationService, private descriptionOfPlanService: DescriptionOfPlanService) {
    }

    ngOnInit() {
        this.typeOfEducationService.getTypesOfEducation().subscribe((res: TypeOfEducation[]) => {
            this.typesOfEducation = res;
        } );

        this.descriptionOfPlanService.getDescriptionOfPlans().subscribe((res: DescriptionOfPlan[]) => {
            this.descriptionsOfPlan = [];
            for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                this.descriptionsOfPlan.push(
                    {
                        id: res[i].id,
                        description: res[i].description,
                        typeOfCourse: res[i].typeOfCourse.id
                    });
            }
          //  this.descriptionsOfPlan = res;
        } );


        this.groupForm = new FormGroup({
            groupName: new FormControl('', Validators.required),
            typeOfEducation: new FormControl([], Validators.required),
            descriptionOfPlanDto: new FormControl([], Validators.required),
            numberOfSubgroup: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
        });
    }

    onSubmit(form: NgForm) {
        console.log('form', form);
        this.groupService.saveGroup(form).subscribe(() => this.gotoGroupsList());
    }

    gotoGroupsList() {
        this.router.navigate(['/dictionaries/groups']);
    }

}
