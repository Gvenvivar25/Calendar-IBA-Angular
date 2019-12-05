import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TypeOfPosition} from '../../../shared/models/employee.model';
import {Department} from '../../../shared/models/department.model';
import {EmployeeService} from '../../../shared/services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../shared/services/department.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

    employeeEditForm: FormGroup;
    typesOfPosition: TypeOfPosition [];
    departments: Department [];
    id: number;

    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router,
                private departmentService: DepartmentService) {
        this.employeeEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getEmployee(this.route.snapshot.params.id);

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
    getEmployee(id: number) {
        this.employeeService.getEmployee(id).subscribe(res => {
            console.log(res);
            this.employeeEditForm.patchValue({
                lastName: res.lastName,
                firstName: res.firstName,
                patronymic: res.patronymic,
                typeOfPosition: res.typeOfPosition.id,
                departmentDto: res.departmentDto,
                startDate: res.startDate,
                endDate: res.endDate,
            });
        });
    }
    onSubmit() {
        console.log(this.employeeEditForm.value);
        this.employeeService.updateEmployee(this.id, this.employeeEditForm.value)
            .subscribe(() => { this.gotoEmployeeList(); } );
        console.log('Submitted!');
    }

    gotoEmployeeList() {
        this.router.navigate(['/dictionaries/employees']);
    }

}
