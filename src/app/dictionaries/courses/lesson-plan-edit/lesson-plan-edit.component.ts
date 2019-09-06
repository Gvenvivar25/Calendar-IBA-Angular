import { Component, OnInit } from '@angular/core';
import {Teacher} from '../../teachers/teacher.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Discipline} from '../../disciplines/discipline.model';
import {TeachersService} from '../../teachers/teachers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../disciplines/disciplines.service';
import {DescriptionOfPlan, LessonPlan, TypeOfWork} from '../course.model';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';

@Component({
  selector: 'app-lesson-plan-edit',
  templateUrl: './lesson-plan-edit.component.html',
  styleUrls: ['./lesson-plan-edit.component.scss']
})
export class LessonPlanEditComponent implements OnInit {

    lessonPlanEditForm: FormGroup;
    id: number;
    descriptionOfPlan: DescriptionOfPlan;
    lessonPlan: LessonPlan;
    lessonPlans: LessonPlan [];
    disciplines: Discipline [];
    typesOfWork: TypeOfWork[];
    discId: number[];

    constructor(private descriptionOfPlanService: DescriptionOfPlanService, private route: ActivatedRoute, private router: Router,
                private disciplinesService: DisciplinesService) {
        this. lessonPlanEditForm = this.createFormGroup();
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

        this.getLessonPlans(this.route.snapshot.params.id);

    }

    getDescriptionOfPlan(id: number) {
        this.descriptionOfPlanService.getDescriptionOfPlan(id).subscribe(res => {
            console.log(res);
            this.descriptionOfPlan = res;
            this.lessonPlanEditForm.patchValue({
                descriptionOfPlan_id: this.descriptionOfPlan.id,
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

    createFormGroup() {
        return new FormGroup({
            descriptionOfPlan_id: new FormControl(''),
            discipline_id: new FormControl(''),
            typeOfWork: new FormControl(''),
            numberOfHours: new FormControl(''),
        });
    }

    /*onDeleteSelectedDiscipline(idD: number) {
        this.teachersService.deleteDisciplineOfTeacher(this.id, idD)
            .subscribe(() => {console.log('Discipline is deleted');
                    this.getDisciplines(this.id);
                }
            );
    }

    onSubmit() {
        const result: any = Object.assign({}, this.teacherEditDisciplinesForm.value);
        result.disciplinesData = Object.assign({}, result.disciplinesData);
        this.discId = result.disciplinesData;
        console.log( result.disciplinesData);

        for (let i = 0, len = Object.keys(this.discId).length; i < len; i++) {
            this.teachersService.addDisciplineToTeacher(this.id, this.discId[i])
                .subscribe();
        }
        this.gotoTeacherList();
    }*/

    gotoTeacherList() {
        this.router.navigate(['/dictionaries/teachers']);
    }

}
