import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {Status} from '../../../shared/models/user.model';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
    userForm: FormGroup;
    statuses: Status[];

    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getAllStatuses().subscribe((res: Status[]) => {
            this.statuses = res;
        });
        this.userForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            patronymic: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            status: new FormControl([], Validators.required),
        });
    }

    onSubmit(form: NgForm) {
        console.log('Submitted!', form);
        this.userService.saveUser(form).subscribe(() => this.gotoUserList());
    }

    gotoUserList() {
        this.router.navigate(['/dictionaries/users']);
    }
}
