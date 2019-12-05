import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../../shared/services/disciplines.service';
import {Discipline} from '../../../shared/models/discipline.model';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-discipline-edit',
  templateUrl: './discipline-edit.component.html',
  styleUrls: ['./discipline-edit.component.css']
})
export class DisciplineEditComponent implements OnInit {
     disciplineForm: FormGroup;
     id: number;
     discipline: Discipline;

    constructor(private route: ActivatedRoute, private router: Router, private disciplineService: DisciplinesService) {    }

    ngOnInit() {
        this.getDiscipline(this.id = this.route.snapshot.params.id);
        this.disciplineForm = new FormGroup({
            disciplineName: new FormControl('', Validators.required),
            shortDisciplineName: new FormControl('', Validators.required),
        });

    }

    getDiscipline(id: number) {
        this.disciplineService.getDiscipline(id).subscribe(res => {
            console.log(res);
            this.discipline = res;
            this.disciplineForm.setValue({
                disciplineName: res.disciplineName,
                shortDisciplineName: res.shortDisciplineName
            });
        });
    }

    onSubmit(form: NgForm) {
        this.disciplineService.updateDiscipline(this.id, form)
            .subscribe(() => {
                    this.router.navigate(['/dictionaries/disciplines']);
                }, (err) => {
                    console.log(err);
                   }
            );
    }

    onCancel() {
        this.router.navigate(['/dictionaries/disciplines'], {relativeTo: this.route});
    }
}
