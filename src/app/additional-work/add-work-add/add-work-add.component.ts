import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../shared/services/group.service';
import {TeachersService} from '../../shared/services/teachers.service';
import {AddWorkOfTeacherService} from '../add-work-of-teacher.service';
import {Teacher} from '../../shared/models/teacher.model';
import {Group} from '../../shared/models/group.model';
import {AddWorkOfTeacher, AddWorkOfTeacherDto, TypeOfAddWork} from '../add-work-of-teacher.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-work-add',
  templateUrl: './add-work-add.component.html',
  styleUrls: ['./add-work-add.component.scss']
})
export class AddWorkAddComponent implements OnInit {
    addWorkForm: FormGroup;
    teachers: Teacher[];
    groups: Group[];
    typesOfAddWork: TypeOfAddWork[];

  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private teachersService: TeachersService,
              private addWorkOfTeacherService: AddWorkOfTeacherService, private route: ActivatedRoute, private router: Router) {

  }


  ngOnInit() {
      const date = new Date();
      const endDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];

      this.addWorkForm = this.formBuilder.group({
          id: [null],
          date: [endDate, Validators.required],
          teacherDto: [[], Validators.required],
          groupDto: [[], Validators.required],
          typeOfAddWork: [[], Validators.required],
          hour: ['', Validators.required],
      });
      this.teachersService.getTeachers().subscribe((res: Teacher[]) => {
          this.teachers = res;
      });

      this.groupService.getGroups().subscribe((res: Group[]) => {
          this.groups = res;
      });

      this.addWorkOfTeacherService.getTypesOfAddWork().subscribe((res: TypeOfAddWork[]) => {
          this.typesOfAddWork = res;
      });
  }

    onSubmit() {
        const result: AddWorkOfTeacher = Object.assign({}, this.addWorkForm.value);
        const newAddWork: AddWorkOfTeacherDto = new AddWorkOfTeacherDto();
        newAddWork.id = null;
        newAddWork.date = result.date;
        newAddWork.hour = result.hour;
        newAddWork.typeOfAddWork = result.typeOfAddWork.id;
        newAddWork.groupDto = {
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
        newAddWork.teacherDto = {
            id: result.teacherDto.id,
            firstName: result.teacherDto.firstName,
            lastName: result.teacherDto.lastName,
            patronymic: result.teacherDto.patronymic,
            typeOfEmployment: result.teacherDto.typeOfEmployment.id,
            color: result.teacherDto.color
        };
        this.addWorkOfTeacherService.addNewWork(newAddWork).subscribe(() => this.gotoAddWorkList());
    }

    gotoAddWorkList() {
        this.router.navigate(['/addWork']);
    }

}
