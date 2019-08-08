import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DisciplinesService} from '../disciplines.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Discipline} from '../discipline.model';

@Component({
  selector: 'app-discipline-detail',
  templateUrl: './discipline-detail.component.html',
  styleUrls: ['./discipline-detail.component.css']
})
export class DisciplineDetailComponent implements OnInit {
    disciplineForm: FormGroup;
    id: number;
    discipline: Discipline;

  constructor(private route: ActivatedRoute, private router: Router, private disciplineService: DisciplinesService) { }

  ngOnInit() {

      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.getDisciplineDetail(this.id);
      });

  }

    getDisciplineDetail(id: number) {
        this.disciplineService.getDiscipline(id).subscribe(res => {
            this.discipline = res;
            console.log(this.discipline)
            this.id = res.id;

            this.disciplineForm.setValue({
                disciplineName: res.disciplineName,
                shortDisciplineName: res.shortDisciplineName
            });
        });
    }

}
