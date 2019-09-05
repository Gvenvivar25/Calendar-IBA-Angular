import {Component, Input, OnInit} from '@angular/core';
import {Teacher} from '../../teachers/teacher.model';
import {Discipline} from '../../disciplines/discipline.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TeachersService} from '../../teachers/teachers.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

    @Input() idCourse: number;
    id: number;
    description: string;
    discipline: string;
    patronymic: string;
    typeOfEmployment: string;

    teacher: Teacher;
    disciplines: Discipline[];

    constructor(private route: ActivatedRoute, private router: Router, private teachersService: TeachersService) { }

    ngOnInit() {
        this.getCourseDetail(this.idCourse);
        this.getTeacherDisciplines(this.idCourse);
    }


    getCourseDetail(id: number) {
        this.teachersService.getTeacher(id).subscribe(res => {
            this.teacher = res;
            console.log(this.teacher);
            this.id = res.id;
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
