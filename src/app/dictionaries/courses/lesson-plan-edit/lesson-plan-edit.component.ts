import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Discipline} from '../../../shared/models/discipline.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../../shared/services/disciplines.service';
import {DescriptionOfPlan, LessonPlan, TypeOfWork} from '../../../shared/models/course.model';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';
import {Teacher, TeacherDto} from '../../../shared/models/teacher.model';
import {TeachersService} from '../../../shared/services/teachers.service';

@Component({
  selector: 'app-lesson-plan-edit',
  templateUrl: './lesson-plan-edit.component.html',
  styleUrls: ['./lesson-plan-edit.component.scss']
})
export class LessonPlanEditComponent implements OnInit {

    lessonPlanEditForm: FormGroup;
    id: number;
    description: string;
    descriptionOfPlan: DescriptionOfPlan;
    lessonPlans: LessonPlan [];
    disciplines: Discipline [];
    typesOfWork: TypeOfWork[];
    teachers: Teacher[];
    teachersDto: TeacherDto[];

    constructor(private descriptionOfPlanService: DescriptionOfPlanService, private route: ActivatedRoute, private router: Router,
                private disciplinesService: DisciplinesService, private teacherService: TeachersService) {
        this. lessonPlanEditForm = this.createFormGroup();
    }

    createFormGroup() {
        return new FormGroup({

            descriptionOfPlanDto: new FormGroup({
                id: new FormControl(''),
                description: new FormControl(''),
                typeOfCourse: new FormControl(''),
            }),
            disciplineDto: new FormControl(''),
            id: new FormControl(''),
            typeOfWork: new FormControl(''),
            teacherDto: new FormControl(''),
            numberOfHours: new FormControl('', [Validators.pattern('^[0-9]*$')]),
        });
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getDescriptionOfPlan(this.route.snapshot.params.id);
        this.disciplinesService.getDisciplines().subscribe((data: Discipline[]) => {
            this.disciplines = data;
        });
        this.descriptionOfPlanService.getTypesOfWork().subscribe((data: TypeOfWork[]) => {
            this.typesOfWork = data;
        });

        this.teacherService.getTeachers().subscribe((res: Teacher[]) => {
            this.teachersDto = [];
            for (let i = 0, len = Object.keys(res).length; i < len; i++) {
                this.teachersDto.push(
                    {
                        id: res[i].id,
                        lastName: res[i].lastName,
                        firstName: res[i].firstName,
                        patronymic: res[i].patronymic,
                        typeOfEmployment: res[i].typeOfEmployment.id,
                        color: res[i].color
                    });
            }
        });

        this.getLessonPlans(this.route.snapshot.params.id);

    }

    getDescriptionOfPlan(id: number) {
        this.descriptionOfPlanService.getDescriptionOfPlan(id).subscribe(res => {
            console.log(res);
            this.descriptionOfPlan = res;
            this.description = res.description;
            this.lessonPlanEditForm.patchValue({
                descriptionOfPlanDto: {
                    id: this.descriptionOfPlan.id,
                    description: this.descriptionOfPlan.description,
                    typeOfCourse: this.descriptionOfPlan.typeOfCourse.id
                },
                id: null
            });
        });
    }

    getLessonPlans(id: number) {
        this.descriptionOfPlanService.getAllLessonPlansOfDescrOfPlan(id)
            .subscribe((data: LessonPlan[]) => {
                console.log(data);
                this.lessonPlans = data;
            });
    }

    onAdd() {
      //  const result: any = Object.assign({}, this.lessonPlanEditForm.value);
        console.log(this.lessonPlanEditForm.value);
        this.descriptionOfPlanService.addlLessonPlansOfDescrOfPlan(this.id, this.lessonPlanEditForm.value).subscribe(
            () => {console.log('Запись добавлена!');
                   this.getLessonPlans(this.id); }
                   );


    }


    onDeleteLessonPlan(idL: number) {
        this.descriptionOfPlanService.deleteLessonPlanOfDescrOfPlan(this.id, idL)
            .subscribe(() => {console.log('Discipline is deleted');
                              this.getLessonPlans(this.id);
                }
            );
    }

    onSubmit() {
        this. gotoCourseList();
    }

    gotoCourseList() {
        this.router.navigate(['/dictionaries/courses']);
    }

}
