import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Teacher} from '../../../shared/models/teacher.model';
import {TeachersService} from '../../../shared/services/teachers.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

    id: number;
    teachers: Teacher [];
    rowSelected: number;

    constructor(private teachersService: TeachersService, private router: Router, private route: ActivatedRoute) {
        this.rowSelected = -1;
    }

    ngOnInit() {
        this.loadTeachers();
        /*this.router.events.subscribe( (event) => {
            if (event instanceof RoutesRecognized) {
                this.loadDisciplines();
                console.log('hey');
            }
        });*/
    }

    onSelect(idTeach: number): void {
        if (this.rowSelected === -1) {
            this.rowSelected = idTeach;
        } else {
            if (this.rowSelected === idTeach) {
                this.rowSelected = -1;
            } else {
                this.rowSelected = idTeach;
            }
        }
    }

    loadTeachers() {
        return this.teachersService.getTeachers()
            .subscribe((data: Teacher[]) => {
                this.teachers = data;
            });
    }

    onDeleteTeacher(teacher: Teacher) {
        /*this.teachersService.getAllDisciplinesOfTeacher(teacher.id).subscribe(res => {
            for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                this.teachersService.deleteDisciplineOfTeacher(teacher.id, res[i].id)
                    .subscribe();
            }
        })*/
        this.teachersService.deleteTeacher(teacher.id).subscribe(() => {
            this.loadTeachers();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }
}
