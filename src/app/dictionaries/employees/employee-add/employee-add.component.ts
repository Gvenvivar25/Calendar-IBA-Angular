import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeOfPosition} from '../../../shared/models/employee.model';
import {Department} from '../../../shared/models/department.model';
import {EmployeeService} from '../../../shared/services/employee.service';
import {DepartmentService} from '../../../shared/services/department.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

    employeeAddForm: FormGroup;
    typesOfPosition: TypeOfPosition [];
    departments: Department [];
    id: number;

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router,
                private departmentService: DepartmentService) {
        this.employeeAddForm = this.createFormGroup();
    }

    ngOnInit() {
        this.employeeService.getTypesOfPOsition().subscribe((res: TypeOfPosition []) => {
            this.typesOfPosition = res;
        } );

        this.departmentService.getDepartments().subscribe((data: Department []) => {
            this.departments = data;
        });

    }

    createFormGroup() {
        return new FormGroup({
            lastName: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            patronymic: new FormControl('', Validators.required),
            typeOfPosition: new FormControl([], Validators.required),
            departmentDto: new FormControl([]),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl(''),
        });
    }
    onSubmit() {
        console.log(this.employeeAddForm.value);
        this.employeeService.saveEmployee(this.employeeAddForm.value)
            .subscribe(() => { this.gotoEmployeeList(); } );
        console.log('Submitted!');
    }

    gotoEmployeeList() {
        this.router.navigate(['/dictionaries/employees']);
    }

}
