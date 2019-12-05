import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../../shared/services/disciplines.service';
import {Discipline} from '../../../shared/models/discipline.model';

@Component({
    selector: 'app-discipline-detail',
    templateUrl: './discipline-detail.component.html',
    styleUrls: ['./discipline-detail.component.css']
})
export class DisciplineDetailComponent implements OnInit {
    @Input() idDisc: number;
    id: number;
    shortDisciplineName: string;
    disciplineName: string;
    discipline: Discipline;

    constructor(private route: ActivatedRoute, private router: Router, private disciplineService: DisciplinesService) { }

    ngOnInit() {
        this.getDisciplineDetail(this.idDisc);
    }


    getDisciplineDetail(id: number) {
        this.disciplineService.getDiscipline(id).subscribe(res => {
            this.discipline = res;
           // console.log(this.discipline)
            this.id = res.id;
            this.disciplineName = res.disciplineName;
            this.shortDisciplineName = res.shortDisciplineName;

        });
    }
}
