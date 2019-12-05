import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DisciplinesService} from '../../../shared/services/disciplines.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-discipline-add',
  templateUrl: './discipline-add.component.html',
  styleUrls: ['./discipline-add.component.css']
})
export class DisciplineAddComponent implements OnInit {
    disciplineAddForm: FormGroup;


    constructor(private route: ActivatedRoute, private router: Router, private disciplineService: DisciplinesService) {
    }

    ngOnInit() {
        this.disciplineAddForm = new FormGroup({
            shortDisciplineName: new FormControl('', Validators.required),
            disciplineName: new FormControl('', Validators.required),
        });
    }

    onSubmit(form: NgForm) {
        console.log('Submitted!', form);
        this.disciplineService.saveDisciplines(form).subscribe(() => this.gotoDisciplineList());
    }

    gotoDisciplineList() {
        this.router.navigate(['/dictionaries/disciplines']);
    }



}
