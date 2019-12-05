import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DescriptionOfPlan, LessonPlan} from '../../../shared/models/course.model';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

    @Input() idCourse: number;
    id: number;
    description: string;
    descriptionOfPlan: DescriptionOfPlan;
    lessonPlans: LessonPlan[];

    constructor(private route: ActivatedRoute, private router: Router, private descriptionOfPlanService: DescriptionOfPlanService) { }

    ngOnInit() {
        this.getCourseDetail(this.idCourse);
        this.getLessonPlansOfDescr(this.idCourse);
    }


    getCourseDetail(id: number) {
        this.descriptionOfPlanService.getDescriptionOfPlan(id).subscribe(res => {
            this.descriptionOfPlan = res;
            console.log(this.descriptionOfPlan);
            this.description = res.description;
            this.id = res.id;
        });
    }

    getLessonPlansOfDescr(id: number) {
        this.descriptionOfPlanService.getAllLessonPlansOfDescrOfPlan(id).subscribe(
            res => {
                if (res == null) {
                    console.log('нет данных');
                } else { this.lessonPlans = res;
                }
            }
        );
    }

}
