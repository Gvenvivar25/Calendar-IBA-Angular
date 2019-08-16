import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherRequest, Type} from '../teacher.model';
import {Discipline} from '../../disciplines/discipline.model';
import {TeachersService} from '../teachers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../disciplines/disciplines.service';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.scss']
})
export class TeacherEditComponent implements OnInit {

    teacherEditForm: FormGroup;
    typesE: Type [];
    disciplines: Discipline [];
    selectedDisciplines: Discipline [];
    typeOfEmployment: string;
    discId: number[];
    id: number;

    constructor(private teachersService: TeachersService, private route: ActivatedRoute, private router: Router,
                private disciplinesService: DisciplinesService) {
        this.teacherEditForm = this.createFormGroup();
    }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.getTeacher(this.route.snapshot.params.id);
      this.teachersService.getTypesOfEmployment().subscribe((res: Type[]) => {
            this.typesE = res;
        } );

      this.disciplinesService.getDisciplines().subscribe((data: Discipline[]) => {
            this.disciplines = data;
        });

      this.teachersService.getAllDisciplinesOfTeacher(this.route.snapshot.params.id)
            .subscribe((data: Discipline[]) => {
              this.selectedDisciplines = data;
        });

    }

    getTeacher(id: number) {
        this.teachersService.getTeacher(id).subscribe(res => {
            console.log(res);
          //  this.discipline = res;
            this.typeOfEmployment = res.typeOfEmployment.value;
            console.log(this.typeOfEmployment);
            this.teacherEditForm.patchValue({
                teacherData: {
                lastName: res.lastName,
                firstName: res.firstName,
                patronymic: res.patronymic,
                typeOfEmployment: res.typeOfEmployment.id
                }
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            teacherData: new FormGroup({
                lastName: new FormControl('', Validators.required),
                firstName: new FormControl('', Validators.required),
                patronymic: new FormControl('', Validators.required),
                typeOfEmployment: new FormControl([], Validators.required),
            }),

            disciplinesData: new FormControl(''),

        });
    }

    onDeleteSelectedDiscipline(idD: number) {
        this.teachersService.deleteDisciplineOfTeacher(this.id, idD).subscribe(() => console.log('Discipline is deleted'));
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
        const result: TeacherRequest = Object.assign({}, this.teacherEditForm.value);
        result.teacherData = Object.assign({}, result.teacherData);
        result.disciplinesData = Object.assign({}, result.disciplinesData);
        this.discId = result.disciplinesData;
        console.log( result.disciplinesData);
        this.teachersService.updateTeacher(this.id, result.teacherData)
            .subscribe(() => console.log('Submitted!'));

        console.log('id: ', this.id);

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
