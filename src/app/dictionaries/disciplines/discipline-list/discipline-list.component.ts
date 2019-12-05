import {Component,  OnInit} from '@angular/core';
import {DisciplinesService} from '../../../shared/services/disciplines.service';

import {Discipline} from '../../../shared/models/discipline.model';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-subject',
    templateUrl: './discipline-list.component.html',
    styleUrls: ['./discipline-list.component.scss']
})
export class DisciplineListComponent implements OnInit {
    id: number;
    disciplines: Discipline [];
    rowSelected: number;

    constructor(private disciplineService: DisciplinesService, private router: Router, private route: ActivatedRoute) {
        this.rowSelected = -1;
    }

    ngOnInit() {
        this.loadDisciplines();
        /*this.router.events.subscribe( (event) => {
            if (event instanceof RoutesRecognized) {
                this.loadDisciplines();
                console.log('hey');
            }
        });*/
    }

    onSelect(idDisc: number): void {
        if (this.rowSelected === -1) {
            this.rowSelected = idDisc;
        } else {
            if (this.rowSelected === idDisc) {
                this.rowSelected = -1;
            } else {
                this.rowSelected = idDisc;
            }
        }
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
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }
}
