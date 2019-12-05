import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {TeachersService} from '../../../shared/services/teachers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TeacherRequest, Type} from '../../../shared/models/teacher.model';
import {Discipline} from '../../../shared/models/discipline.model';
import {DisciplinesService} from '../../../shared/services/disciplines.service';


@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss']
})
export class TeacherAddComponent implements OnInit {
    teacherAddForm: FormGroup;
    types: Type [];
    disciplines: Discipline [];
    discId: number[];
    id: number;
    color: string;

  constructor(private teachersService: TeachersService, private route: ActivatedRoute, private router: Router,
              private disciplinesService: DisciplinesService) {
      this.teacherAddForm = this.createFormGroup();
  }

  ngOnInit() {
    this.teachersService.getTypesOfEmployment().subscribe((res: Type[]) => {
        this.types = res;
    } );

    this.disciplinesService.getDisciplines().subscribe((data: Discipline[]) => {
        this.disciplines = data;
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
     const result: TeacherRequest = Object.assign({}, this.teacherAddForm.value);
     result.teacherData = Object.assign({}, result.teacherData);
     result.disciplinesData = Object.assign({}, result.disciplinesData);
     this.discId = result.disciplinesData;
     result.teacherData.color = this.color;
     this.teachersService.saveTeacher(result.teacherData)
         .subscribe(res => { this.id = res.id;
                             for (let i = 0, len = Object.keys(this.discId).length; i < len; i++) {
                                this.teachersService.addDisciplineToTeacher(this.id, result.disciplinesData[i])
                                .subscribe();
             }
                             this.gotoTeacherList(); } );
     console.log('Submitted!');
      }

    gotoTeacherList() {
        this.router.navigate(['/dictionaries/teachers']);
    }
}
