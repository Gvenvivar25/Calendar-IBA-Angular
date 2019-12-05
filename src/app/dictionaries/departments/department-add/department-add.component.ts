import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../shared/services/department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss']
})
export class DepartmentAddComponent implements OnInit {

    departmentForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentService) {
    }

    ngOnInit() {
        this.departmentForm = new FormGroup({
            shortName: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required)
        });
    }

    onSubmit(form: NgForm) {
        console.log('Submitted!', form);
        this.departmentService.saveDepartment(form).subscribe(() => this.gotoDepartmentsList());
    }

    gotoDepartmentsList() {
        this.router.navigate(['/dictionaries/departments']);
    }
}
