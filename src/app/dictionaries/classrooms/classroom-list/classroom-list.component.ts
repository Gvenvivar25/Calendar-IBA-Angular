import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Classroom} from '../../../shared/models/classroom.model';
import {ClassroomService} from '../../../shared/services/classroom.service';



@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {


    classrooms: Classroom [];


    constructor(private classroomService: ClassroomService, private router: Router, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.loadClassrooms();
    }

    loadClassrooms() {
        return this.classroomService.getClassrooms()
            .subscribe((data: Classroom[]) => {
                this.classrooms = data;
            });
    }

    onDeleteClassroom(classroom: Classroom) {
        this.classroomService.deleteClassroom(classroom.id).subscribe(() => {
            this.loadClassrooms();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }

}
