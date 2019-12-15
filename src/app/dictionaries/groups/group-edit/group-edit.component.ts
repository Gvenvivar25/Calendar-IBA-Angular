import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../../shared/services/group.service';
import { GroupDto, TypeOfEducation} from '../../../shared/models/group.model';
import {DescriptionOfPlan} from '../../../shared/models/course.model';
import {TypeOfEducationService} from '../../../shared/services/type-of-education.service';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';


@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

    groupEditForm: FormGroup;
    id: number;
    color: string;

    typesOfEducation: TypeOfEducation [];
    descriptionsOfPlan: DescriptionOfPlan [];

    constructor(private route: ActivatedRoute, private router: Router,
                private groupService: GroupService,
                private typeOfEducationService: TypeOfEducationService, private descriptionOfPlanService: DescriptionOfPlanService) {
        this.groupEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.descriptionOfPlanService.getDescriptionOfPlans().subscribe((res: DescriptionOfPlan[]) => {
            this.descriptionsOfPlan = res;
        } );

        this.typeOfEducationService.getTypesOfEducation().subscribe((res: TypeOfEducation[]) => {
            this.typesOfEducation = res;
        } );
        this.getGroup(this.route.snapshot.params.id);


    }

    getGroup(id: number) {
        this.groupService.getGroup(id).subscribe(res => {
            console.log(res);
            console.log(res.descriptionOfPlanDto.id);
            this.color = res.color;
            this.groupEditForm.patchValue({
                groupName: res.groupName,
                typeOfEducation: res.typeOfEducation.id,
                descriptionOfPlanDto: res.descriptionOfPlanDto,
                numberOfSubgroup: res.numberOfSubgroup,
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            groupName: new FormControl('', Validators.required),
            typeOfEducation: new FormControl([], Validators.required),
            descriptionOfPlanDto: new FormControl([], Validators.required),
            numberOfSubgroup: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
        });
    }

    onSubmit() {
        const result: GroupDto = new GroupDto();
       // result.id = this.id;
        result.groupName = this.groupEditForm.controls.groupName.value;
        result.typeOfEducation = this.groupEditForm.controls.typeOfEducation.value;
        result.numberOfSubgroup = +this.groupEditForm.controls.numberOfSubgroup.value;
        result.color = this.color;
        result.descriptionOfPlanDto = {
            id: this.groupEditForm.controls.descriptionOfPlanDto.value.id,
            typeOfCourse: this.groupEditForm.controls.descriptionOfPlanDto.value.typeOfCourse.id,
            description: this.groupEditForm.controls.descriptionOfPlanDto.value.description,
        };

        this.groupService.updateGroup(this.id, result)
            .subscribe(() => {console.log('Submitted!'); this.gotoGroupList(); });
    }

    gotoGroupList() {
        this.router.navigate(['/dictionaries/groups']);
    }
}
