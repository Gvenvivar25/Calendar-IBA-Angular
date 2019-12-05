import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassroomService} from '../../../shared/services/classroom.service';
import {Classroom, TypeOfClassroom} from '../../../shared/models/classroom.model';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.scss']
})
export class ClassroomAddComponent implements OnInit {

    classroomForm: FormGroup;
    typesOfClassroom: TypeOfClassroom[];
    color: string;
    constructor(private route: ActivatedRoute, private router: Router, private classroomService: ClassroomService,
                private formBuilder: FormBuilder) {   }

    ngOnInit() {
        this.classroomForm = this.formBuilder.group({
            number: ['', Validators.required],
            typeOfClassroom: [[], Validators.required]
        });
        this.classroomService.getTypesOfClassroom().subscribe((res: TypeOfClassroom[]) => {
            this.typesOfClassroom = res;
        } );


    }

    onSubmit() {
        const classroom: Classroom = new Classroom();
        classroom.number = this.classroomForm.value.number;
        classroom.typeOfClassroom = this.classroomForm.value.typeOfClassroom;
        classroom.color = this.color;
        this.classroomService.saveClassroom(classroom).subscribe(() => {
            this.gotoClassroomList(); });

    }

    gotoClassroomList() {
        this.router.navigate(['/dictionaries/classrooms']);
    }
}
