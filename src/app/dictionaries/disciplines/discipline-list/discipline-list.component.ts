import { Component, OnInit} from '@angular/core';
import {DisciplinesService} from '../disciplines.service';

import {Discipline} from '../discipline.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './discipline-list.component.html',
  styleUrls: ['./discipline-list.component.css']
})
export class DisciplineListComponent implements OnInit {
   disciplines: Discipline [];

  constructor(private disciplineService: DisciplinesService, private router: Router, private route: ActivatedRoute) {  }

  ngOnInit() {
  this.loadDisciplines();
  }

    loadDisciplines() {
        return this.disciplineService.getDisciplines()
           .subscribe((data: Discipline[]) => {
           this.disciplines = data;
       });
    }

    onDeleteDiscipline(discipline: Discipline) {
        this.disciplineService.deleteDiscipline(discipline.id).subscribe(() => {
            this.loadDisciplines();
            console.log('Deleted');
        });
    }

    onAdd() {
        this.router.navigate(['/dictionaries/add'], {relativeTo: this.route});
    }
}
