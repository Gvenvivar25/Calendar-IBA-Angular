import { Component, OnInit } from '@angular/core';
import {TeachersService} from '../../../shared/services/teachers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../../shared/services/disciplines.service';
import {Discipline} from '../../../shared/models/discipline.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Teacher} from '../../../shared/models/teacher.model';

@Component({
  selector: 'app-teacher-edit-disciplines',
  templateUrl: './teacher-edit-disciplines.component.html',
  styleUrls: ['./teacher-edit-disciplines.component.scss']
})
export class TeacherEditDisciplinesComponent implements OnInit {
    id: number;
    teacher: Teacher;
    lastName: string;
    firstName: string;
    patronymic: string;
    typeOfEmployment: string;
    teacherEditDisciplinesForm: FormGroup;
    disciplines: Discipline [];
    selectedDisciplines: Discipline [];
    discId: number[];

  constructor(private teachersService: TeachersService, private route: ActivatedRoute, private router: Router,
              private disciplinesService: DisciplinesService) {
      this.teacherEditDisciplinesForm = this.createFormGroup();
  }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getTeacher(this.route.snapshot.params.id);
        this.disciplinesService.getDisciplines().subscribe((data: Discipline[]) => {
            this.disciplines = data;
        });

        this.getDisciplines(this.route.snapshot.params.id);
    }

    getTeacher(id: number) {
        this.teachersService.getTeacher(id).subscribe(res => {
            console.log(res);
            this.teacher = res;
            this.lastName = res.lastName;
            this.firstName = res.firstName;
            this.patronymic = res.patronymic;
            this.typeOfEmployment = res.typeOfEmployment.value;

        });
    }

    getDisciplines(id: number) {
        this.teachersService.getAllDisciplinesOfTeacher(id)
            .subscribe((data: Discipline[]) => {
                this.selectedDisciplines = data;
            });
    }

    createFormGroup() {
        return new FormGroup({
            disciplinesData: new FormControl(''),
        });
    }

    onDeleteSelectedDiscipline(idD: number) {
        this.teachersService.deleteDisciplineOfTeacher(this.id, idD)
            .subscribe(() => {console.log('Discipline is deleted');
                              this.getDisciplines(this.id);
            }
        );
    }

    onSubmit() {
        const result: any = Object.assign({}, this.teacherEditDisciplinesForm.value);
        result.disciplinesData = Object.assign({}, result.disciplinesData);
        this.discId = result.disciplinesData;
        console.log( result.disciplinesData);

        for (let i = 0, len = Object.keys(this.discId).length; i < len; i++) {
            this.teachersService.addDisciplineToTeacher(this.id, this.discId[i])
                .subscribe();
        }
        this.gotoTeacherList();
    }

    gotoTeacherList() {
        this.router.navigate(['/dictionaries/teachers']);
    }

}
