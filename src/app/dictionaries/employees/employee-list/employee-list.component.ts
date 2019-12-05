import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../../shared/models/employee.model';
import {EmployeeService} from '../../../shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

    id: number;
    employees: Employee [];
    rowSelected: number;

    constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
        this.rowSelected = -1;
    }

    ngOnInit() {
        this.loadEmployees();
    }

    onSelect(idEmp: number): void {
        if (this.rowSelected === -1) {
            this.rowSelected = idEmp;
        } else {
            if (this.rowSelected === idEmp) {
                this.rowSelected = -1;
            } else {
                this.rowSelected = idEmp;
            }
        }
    }

    loadEmployees() {
        return this.employeeService.getEmployees()
            .subscribe((data: Employee[]) => {
                this.employees = data;
            });
    }

    onDeleteEmployee(employee: Employee) {
        this.employeeService.deleteEmployee(employee.id).subscribe(() => {
            this.loadEmployees();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }
}
