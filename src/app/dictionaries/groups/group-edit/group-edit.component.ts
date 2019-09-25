import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../group.service';
import { TypeOfEducation} from '../group.model';
import {DescriptionOfPlan, DescriptionOfPlanDto} from '../../courses/course.model';
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

    typesOfEducation: TypeOfEducation [];
    descriptionsOfPlan: DescriptionOfPlanDto [];

    constructor(private route: ActivatedRoute, private router: Router,
                private groupService: GroupService,
                private typeOfEducationService: TypeOfEducationService, private descriptionOfPlanService: DescriptionOfPlanService) {
        this.groupEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
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
        } );
        this.getGroup(this.route.snapshot.params.id);


        this.typeOfEducationService.getTypesOfEducation().subscribe((res: TypeOfEducation[]) => {
            this.typesOfEducation = res;
        } );


    }
// метод для изменения объекта DescriptionOfPlanDto для того, чтобы потом закинуть на сервер
    getDescriptionOfPlanToForm(id: number): DescriptionOfPlanDto {
        return this.descriptionsOfPlan.find(res => res.id === id);
    }

    getGroup(id: number) {
        this.groupService.getGroup(id).subscribe(res => {
            console.log(res);
            this.groupEditForm.patchValue({
                groupName: res.groupName,
                typeOfEducation: res.typeOfEducation.id,
                descriptionOfPlanDto: this.getDescriptionOfPlanToForm(res.id),
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
        this.groupService.updateGroup(this.id, this.groupEditForm.value)
            .subscribe(() => {console.log('Submitted!'); this.gotoGroupList(); });
    }

    gotoGroupList() {
        this.router.navigate(['/dictionaries/groups']);
    }
}
