import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Group, NumberOfStudents, NumberOfStudentsDto} from '../../../shared/models/group.model';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../../../shared/services/group.service';

@Component({
  selector: 'app-group-add-students',
  templateUrl: './group-add-students.component.html',
  styleUrls: ['./group-add-students.component.scss']
})
export class GroupAddStudentsComponent implements OnInit {

    studentsAddForm: FormGroup;
    groupName: string;
  //  group: Group;
    id: number;
    numbersOfStudents: NumberOfStudents[];

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
                private groupService: GroupService) {
        this.studentsAddForm = this.formBuilder.group({
            id: [null],
            date: [null, Validators.required],
            groupDto: [[], Validators.required],
            subgroup: ['', Validators.required],
            quantity: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.groupService.getGroup(this.id).subscribe((res: Group) => {
            this.groupName = res.groupName;
          //  this.group = res;
            this.studentsAddForm.patchValue({groupDto: res});
        } );
        this.getNumberOfStudents(this.id);
    }

    getNumberOfStudents(id) {
        this.groupService.getAllNumberOfStudents(id).subscribe((res: NumberOfStudents[]) => {
            this.numbersOfStudents = res;
        });

    }

    /*onSubmit() {

        this.groupService.saveNumberOfStudents(this.studentsAddForm.value).subscribe(() => this.gotoGroupsList());
    }*/

    gotoGroupsList() {
        this.router.navigate(['/dictionaries/groups']);
    }

    onAdd() {
        const result: NumberOfStudents = Object.assign({}, this.studentsAddForm.value);
        console.log(result);
        const numberOgStudentsDto = new NumberOfStudentsDto();
        numberOgStudentsDto.date = result.date;
        numberOgStudentsDto.id = null;
        numberOgStudentsDto.quantity = result.quantity;
        numberOgStudentsDto.subgroup = result.subgroup;
        numberOgStudentsDto.groupDto = {
            id: result.groupDto.id,
            groupName: result.groupDto.groupName,
            numberOfSubgroup: result.groupDto.numberOfSubgroup,
            typeOfEducation: result.groupDto.typeOfEducation.id,
            descriptionOfPlanDto: {
                id: result.groupDto.descriptionOfPlanDto.id,
                description: result.groupDto.descriptionOfPlanDto.description,
                typeOfCourse: result.groupDto.descriptionOfPlanDto.typeOfCourse.id,
            },
            color: result.groupDto.color
        };
        this.groupService.saveNumberOfStudents(numberOgStudentsDto).subscribe(() => this.gotoGroupsList());
    }

    onDeleteStudents(id: number) {
        this.groupService.deleteNumberOfStudents(id).subscribe(
            () => {console.log('Students is deleted');
                   this.getNumberOfStudents(this.id);
        });

    }

}
