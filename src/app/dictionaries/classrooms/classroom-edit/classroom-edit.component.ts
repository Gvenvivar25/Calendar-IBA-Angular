import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Classroom, TypeOfClassroom} from '../classroom.model';
import {ClassroomService} from '../classroom.service';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.component.html',
  styleUrls: ['./classroom-edit.component.scss']
})
export class ClassroomEditComponent implements OnInit {

    classroomEditForm: FormGroup;
    typesOfClassroom: TypeOfClassroom[];
    typeOfClassroom: string;
    id: number;

    constructor(private classroomService: ClassroomService, private route: ActivatedRoute, private router: Router) {
        this.classroomEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getClassroom(this.route.snapshot.params.id);
        this.classroomService.getTypesOfClassroom().subscribe((res: TypeOfClassroom[]) => {
            this.typesOfClassroom = res;
        } );
    }

    getClassroom(id: number) {
        this.classroomService.getClassroom(id).subscribe(res => {
            console.log(res);
            this.typeOfClassroom = res.typeOfClassroom.value;
            this.classroomEditForm.patchValue({
                number: res.number,
                typeOfClassroom: res.typeOfClassroom.id
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            number: new FormControl('', Validators.required),
            typeOfClassroom: new FormControl([], Validators.required),
        });
    }

    onSubmit() {
        const result: Classroom = Object.assign({}, this.classroomEditForm.value);
        this.classroomService.updateClassroom(this.id, result)
            .subscribe(() => {console.log('Submitted!'); this.gotoClassroomList(); });
    }

    gotoClassroomList() {
        this.router.navigate(['/dictionaries/classrooms']);
    }

}
