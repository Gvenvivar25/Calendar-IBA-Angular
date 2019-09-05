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

    id: number;
    descriptionOfPlan: string;
    lessonPlan: LessonPlan;
    lessonPlanEditForm: FormGroup;
    disciplines: Discipline [];
    typesOfWork: TypeOfWork[];
    selectedDisciplines: Discipline [];
    discId: number[];

    constructor(private getDescriptionOfPlanService: DescriptionOfPlanService, private route: ActivatedRoute, private router: Router,
                private disciplinesService: DisciplinesService) {
        this. lessonPlanEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getDescriptionOfPlan(this.route.snapshot.params.id);
        this.disciplinesService.getDisciplines().subscribe((data: Discipline[]) => {
            this.disciplines = data;
        });

      //  this.getDisciplines(this.route.snapshot.params.id);
    }

    getDescriptionOfPlan(id: number) {
        this.getDescriptionOfPlanService.getDescriptionOfPlan(id).subscribe(res => {
            console.log(res);
            this.descriptionOfPlan = res.description;
        });
    }

    /*getDisciplines(id: number) {
        this.teachersService.getAllDisciplinesOfTeacher(id)
            .subscribe((data: Discipline[]) => {
                this.selectedDisciplines = data;
            });
    }*/

    createFormGroup() {
        return new FormGroup({
            disciplinesData: new FormControl(''),
            typeOfWorkData: new FormControl(''),
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
