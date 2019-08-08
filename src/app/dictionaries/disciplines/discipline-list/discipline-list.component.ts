import { Component, OnInit } from '@angular/core';
import {DisciplinesService} from '../disciplines.service';
import {Subscription} from 'rxjs';
import {Discipline} from '../discipline.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './discipline-list.component.html',
  styleUrls: ['./discipline-list.component.css']
})
export class DisciplineListComponent implements OnInit {
    disciplines: Discipline [];

  constructor(private disciplineService: DisciplinesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadDisciplines();

  }

    loadDisciplines() {
       return this.disciplineService.getDisciplines()
           .subscribe((data: Discipline[]) => {
           this.disciplines = data;
       });
    }

    /*onEditDiscipline(id: number) {
        this.router.navigate([ 'edit'], {relativeTo: this.route});

    }*/

    onDeleteDiscipline(discipline: Discipline) {
        this.disciplineService.deleteDiscipline(discipline.id).subscribe(() => {
                console.log('Deleted');
        });
    }

}
