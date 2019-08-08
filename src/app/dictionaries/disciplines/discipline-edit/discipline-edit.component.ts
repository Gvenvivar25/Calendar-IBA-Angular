import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DisciplinesService} from '../disciplines.service';
import {Discipline} from '../discipline.model';
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
        this.id = this.route.snapshot.params['id'];
        console.log(this.id);
        this.getDiscipline(this.id = this.route.snapshot.params['id']);
       // this.disciplineService.getDiscipline(this.id).subscribe((data: Discipline) => {this.discipline = data; });



    //   console.log(this.discipline.shortDisciplineName);

        this.disciplineForm = new FormGroup({
            'disciplineName': new FormControl('', Validators.required),
            'shortDisciplineName': new FormControl('', Validators.required),
        });

    }

    getDiscipline(id: number) {
        this.disciplineService.getDiscipline(id).subscribe(res => {
            console.log(res);
            this.discipline = res;
            this.id = res.id;
            console.log(this.discipline.shortDisciplineName);
            this.disciplineForm.setValue({
                disciplineName: res.disciplineName,
                shortDisciplineName: res.shortDisciplineName
            });
        });
    }

    onSubmit(form: NgForm) {
        this.disciplineService.updateDiscipline(this.id, form)
            .subscribe(res => {
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


/*
//  discipline: Discipline;
id: number;
editMode = false;
disciplineForm: FormGroup;


constructor(private route: ActivatedRoute, private router: Router, private disciplineService: DisciplinesService) {
    //   this.discipline = new Discipline();
}


ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
            console.log(this.id);
        }
    );
}

onSubmit(form: FormGroup) {

    if (this.editMode) {
        this.disciplineService.updateDiscipline(this.id, this.disciplineForm.value);
    } else {this.onCancel(); }
}

onCancel() {
    this.router.navigate(['/dictionaries/disciplines'], {relativeTo: this.route});
}

private initForm() {
    let disciplineName = '';
    let shortDisciplineName = '';

    if (this.editMode) {
        const discipline = this.disciplineService.getDiscipline(this.id);
        disciplineName = discipline.disciplineName;
        shortDisciplineName = discipline.shortDisciplineName;

    }
    this.disciplineForm = new FormGroup({
        'disciplineName': new FormControl(disciplineName, Validators.required),
        'shortDisciplineName': new FormControl(shortDisciplineName, Validators.required),

    });
}

*/
