import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Teacher} from '../../shared/models/teacher.model';
import {Group} from '../../shared/models/group.model';
import {AddWorkOfTeacher, AddWorkOfTeacherDto, TypeOfAddWork} from '../add-work-of-teacher.model';
import {GroupService} from '../../shared/services/group.service';
import {TeachersService} from '../../shared/services/teachers.service';
import {AddWorkOfTeacherService} from '../add-work-of-teacher.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-work-edit',
  templateUrl: './add-work-edit.component.html',
  styleUrls: ['./add-work-edit.component.scss']
})
export class AddWorkEditComponent implements OnInit {

    editWorkForm: FormGroup;
    teachers: Teacher[];
    groups: Group[];
    typesOfAddWork: TypeOfAddWork[];
    id: number;

    constructor(private formBuilder: FormBuilder, private groupService: GroupService, private teachersService: TeachersService,
                private addWorkOfTeacherService: AddWorkOfTeacherService, private route: ActivatedRoute, private router: Router) {
        this.editWorkForm = this.formBuilder.group({
            id: [null],
            date: [null, Validators.required],
            teacherDto: ['', Validators.required],
            groupDto: ['', Validators.required],
            typeOfAddWork: [[], Validators.required],
            hour: ['', Validators.required],
        });
    }

  ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.teachersService.getTeachers().subscribe((res: Teacher[]) => {
          this.teachers = res;
      });

      this.groupService.getGroups().subscribe((res: Group[]) => {
          this.groups = res;
      });

      this.addWorkOfTeacherService.getTypesOfAddWork().subscribe((res: TypeOfAddWork[]) => {
          this.typesOfAddWork = res;
      });
      this.getAddWork(this.id);
  }

    getAddWork(id: number) {
        this.addWorkOfTeacherService.getOneWork(id).subscribe(res => {
            console.log(res);
            this.editWorkForm.patchValue({
                id: res.id,
                date: res.date,
                teacherDto: res.teacherDto,
                groupDto: res.groupDto,
                typeOfAddWork: res.typeOfAddWork,
                hour: res.hour
            });
        });
    }

    onSubmit() {
        const result: AddWorkOfTeacher = Object.assign({}, this.editWorkForm.value);
        const updateAddwork: AddWorkOfTeacherDto = new AddWorkOfTeacherDto();
        updateAddwork.id = result.id;
        updateAddwork.date = result.date;
        updateAddwork.hour = result.hour;
        updateAddwork.typeOfAddWork = result.typeOfAddWork.id;
        updateAddwork.groupDto = {
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
        updateAddwork.teacherDto = {
            id: result.teacherDto.id,
            firstName: result.teacherDto.firstName,
            lastName: result.teacherDto.lastName,
            patronymic: result.teacherDto.patronymic,
            typeOfEmployment: result.teacherDto.typeOfEmployment.id,
            color: result.teacherDto.color
        };

        this.addWorkOfTeacherService.updateAddWork(updateAddwork)
            .subscribe(() => {console.log('Submitted!'); this.gotoAddWorkList(); });
    }

    gotoAddWorkList() {
        this.router.navigate(['/addWork']);
    }


}
