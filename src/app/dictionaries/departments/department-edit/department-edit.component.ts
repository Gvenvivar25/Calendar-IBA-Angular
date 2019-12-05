import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentService} from '../../../shared/services/department.service';
import {Department} from '../../../shared/models/department.model';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {

    departmentEditForm: FormGroup;
    id: number;

    constructor(private departmentService: DepartmentService, private route: ActivatedRoute, private router: Router) {
        this.departmentEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getDepartment(this.route.snapshot.params.id);
    }

    getDepartment(id: number) {
        this.departmentService.getDepartment(id).subscribe(res => {
            console.log(res);
            this.departmentEditForm.patchValue({
                shortName: res.shortName,
                name: res.name,
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            shortName: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        const result: Department = Object.assign({}, this.departmentEditForm.value);
        this.departmentService.updateDepartment(this.id, result)
            .subscribe(() => {console.log('Submitted!'); this.gotoCoursesList(); });
    }

    gotoCoursesList() {
        this.router.navigate(['/dictionaries/departments']);
    }

}
