import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DisciplinesService} from '../disciplines.service';
import {Subject, Subscription} from 'rxjs';
import {Discipline} from '../discipline.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

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
                console.log('Deleted');
        });
    }
}
