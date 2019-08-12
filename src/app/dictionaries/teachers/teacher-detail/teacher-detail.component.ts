import {Component, Input, OnInit} from '@angular/core';
import {Discipline} from '../../disciplines/discipline.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../disciplines/disciplines.service';
import {Teacher} from '../teacher.model';
import {TeachersService} from '../teachers.service';

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

    constructor(private route: ActivatedRoute, private router: Router, private teachersService: TeachersService) { }

    ngOnInit() {
        this.getTeacherDetail(this.idTeach);
    }


    getTeacherDetail(id: number) {
        this.teachersService.getTeacher(id).subscribe(res => {
            this.teacher = res;
            console.log(this.teacher);
            this.id = res.id;
            this.lastName = res.lastName;
            this.firstName = res.firstName;
            this.typeOfEmployment = res.typeOfEmployment;

        });
    }

}
