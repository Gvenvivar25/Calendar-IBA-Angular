import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {TeachersService} from '../teachers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Teacher} from '../teacher.model';


@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.scss']
})
export class TeacherAddComponent implements OnInit {
    teacherAddForm: FormGroup;
    types: {id: string; value: string};
    myType: string;


  constructor(private teachersService: TeachersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.teachersService.getTypesOfEmployment().subscribe(res => {
        console.log(res);
        this.types = res;
        this.teacherAddForm.patchValue({
       lastName: '',
        firstName: '',
        patronymic: '',
        typeOfEmployment: this.types});
    } );

    this.teacherAddForm = new FormGroup({

        'lastName': new FormControl('', Validators.required),
        'firstName': new FormControl('', Validators.required),
        'patronymic': new FormControl(this.types, Validators.required),
        'typeOfEmployment': new FormControl('', [Validators.required]),
       });

    }

    get typeOfEmployment() {
        return this.teacherAddForm.get('typeOfEmployment');
    }
    changeType(e) {
      this.typeOfEmployment.setValue(e.target.value, {
            onlySelf: true
        });
      this.myType = e.target.value;
    }

    onSubmit(form: NgForm) {
      console.log('Submitted!', form);
      this.teachersService.saveTeacher(form).subscribe(result => this.gotoTeacherList());
    }

    gotoTeacherList() {
        this.router.navigate(['/dictionaries/teachers']);
    }


}
