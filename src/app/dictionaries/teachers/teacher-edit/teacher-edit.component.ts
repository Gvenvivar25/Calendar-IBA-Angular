import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Teacher, Type} from '../../../shared/models/teacher.model';
import {TeachersService} from '../../../shared/services/teachers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.scss']
})
export class TeacherEditComponent implements OnInit {

    teacherEditForm: FormGroup;
    typesE: Type [];
    typeOfEmployment: string;
    id: number;
    color: string;

    constructor(private teachersService: TeachersService, private route: ActivatedRoute, private router: Router) {
        this.teacherEditForm = this.createFormGroup();
    }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.getTeacher(this.route.snapshot.params.id);
      this.teachersService.getTypesOfEmployment().subscribe((res: Type[]) => {
            this.typesE = res;
        } );
    }

    getTeacher(id: number) {
        this.teachersService.getTeacher(id).subscribe(res => {
            console.log(res);
            this.color = res.color;
            this.typeOfEmployment = res.typeOfEmployment.value;
            console.log(this.typeOfEmployment);
            this.teacherEditForm.patchValue({
                lastName: res.lastName,
                firstName: res.firstName,
                patronymic: res.patronymic,
                typeOfEmployment: res.typeOfEmployment.id
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            lastName: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            patronymic: new FormControl('', Validators.required),
            typeOfEmployment: new FormControl([], Validators.required)
        });
    }

// старый вариант селектора
    /*    get typeOfEmployment() {
            return this.teacherAddForm.get('teacherData.typeOfEmployment');
        }
        changeType(e) {
          this.typeOfEmployment.setValue(e.target.value, {
                onlySelf: true
            });
          this.myType = e.target.value;
        }*/
    // что тут происходит:
    // получаем значение все формы в искусственный объект (theacher.model.ts)
    // разбираем объект по formgroup (то, что сгруппировано на форме)
    // часть объекта отправляю для добавления на сервер, сразу получаю id препода и с ним добавляю предметы к преподу
    onSubmit() {
        const result: Teacher = Object.assign({}, this.teacherEditForm.value);
        result.color = this.color;
        console.log(result);
        this.teachersService.updateTeacher(this.id, result)
            .subscribe(() => {console.log('Submitted!');
                              this.gotoTeacherList(); });
    }

    gotoTeacherList() {
        this.router.navigate(['/dictionaries/teachers']);
    }
}
