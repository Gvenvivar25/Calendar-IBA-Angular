import {Component, Input, OnInit} from '@angular/core';
import {Discipline} from '../../../shared/models/discipline.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from '../../../shared/models/teacher.model';
import {TeachersService} from '../../../shared/services/teachers.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {

    @Input() idTeach: number;
    id: number;
    lastName: string;
    firstName: string;
    patronymic: string;
    typeOfEmployment: string;

    teacher: Teacher;
    disciplines: Discipline[];

    constructor(private route: ActivatedRoute, private router: Router, private teachersService: TeachersService) { }

    ngOnInit() {
        this.getTeacherDetail(this.idTeach);
        this.getTeacherDisciplines(this.idTeach);
    }


    getTeacherDetail(id: number) {
        this.teachersService.getTeacher(id).subscribe(res => {
            this.teacher = res;
            console.log(this.teacher);
            this.id = res.id;
            this.lastName = res.lastName;
            this.firstName = res.firstName;
            this.patronymic = res.patronymic;
            this.typeOfEmployment = res.typeOfEmployment.value;

        });
    }

    getTeacherDisciplines(id: number) {
        this.teachersService.getAllDisciplinesOfTeacher(id).subscribe(
            res => {
                if (res == null) {
                    console.log('нет данных');
                 } else { this.disciplines = res;
                }
            }
        );
    }

}
