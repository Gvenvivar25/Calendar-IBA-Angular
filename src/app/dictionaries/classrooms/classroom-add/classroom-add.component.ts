import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassroomService} from '../classroom.service';
import {Classroom, TypeOfClassroom} from '../classroom.model';
import {ToastrService} from 'ngx-toastr';

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
                ) {
    }

    ngOnInit() {

        this.classroomService.getTypesOfClassroom().subscribe((res: TypeOfClassroom[]) => {
            this.typesOfClassroom = res;
        } );
        this.classroomForm = new FormGroup({
            number: new FormControl('', Validators.required),
            typeOfClassroom: new FormControl([], Validators.required),
        });
    }

    onSubmit(form: NgForm) {
        const classroom: Classroom = new Classroom();
        classroom.number = this.classroomForm.value.number;
        classroom.typeOfClassroom = this.classroomForm.value.typeOfClassroom;
        classroom.color = this.color;
        console.log(classroom);
        console.log('Submitted!', form);
        this.classroomService.saveClassroom(classroom).subscribe(() => {
            this.gotoClassroomList(); });

    }

    gotoClassroomList() {
        this.router.navigate(['/dictionaries/classrooms']);
    }
}
