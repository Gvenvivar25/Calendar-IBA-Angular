import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Discipline} from '../../disciplines/discipline.model';
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
    description: string;
    descriptionOfPlan: DescriptionOfPlan;
    lessonPlans: LessonPlan [];
    disciplines: Discipline [];
    typesOfWork: TypeOfWork[];

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
            this.description = res.description;
            this.lessonPlanEditForm.patchValue({
                descriptionOfPlanDto: this.descriptionOfPlan,
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
            descriptionOfPlanDto: new FormControl(''),
            disciplineDto: new FormControl(''),
            typeOfWork: new FormControl(''),
            numberOfHours: new FormControl('', [Validators.pattern('^[0-9]*$')]),
        });
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
