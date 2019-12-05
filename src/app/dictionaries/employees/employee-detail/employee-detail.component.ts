import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../../shared/models/employee.model';
import {EmployeeService} from '../../../shared/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

    @Input() idEmp: number;
    id: number;
    lastName: string;
    firstName: string;
    patronymic: string;
    typeOfPosition: string;
    departmentDto: string;
    startDate: Date;
    endDate: Date;
    employee: Employee;

    constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) { }

    ngOnInit() {
        this.getEmployeeDetail(this.idEmp);
    }

    getEmployeeDetail(id: number) {
        this.employeeService.getEmployee(id).subscribe(res => {
            this.employee = res;
            console.log(this.employee);
            this.id = res.id;
            this.lastName = res.lastName;
            this.firstName = res.firstName;
            this.patronymic = res.patronymic;
            this.typeOfPosition = res.typeOfPosition.value;
            if (res.departmentDto) {this.departmentDto = res.departmentDto.name; } else {
                this.departmentDto = 'Нет';
            }
            this.startDate = res.startDate;
            this.endDate = res.endDate;
        });
    }

}
