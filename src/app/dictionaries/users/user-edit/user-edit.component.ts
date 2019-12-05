import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    userEditForm: FormGroup;
    id: number;

    constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
        this.userEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getUser(this.route.snapshot.params.id);
    }

    getUser(id: number) {
        this.userService.getUser(id).subscribe(res => {
            console.log(res);
            this.userEditForm.patchValue({
                username: res.username,
              //  password: res.password,
                lastName: res.lastName,
                firstName: res.firstName,
                patronymic: res.patronymic,
                email: res.email
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            username: new FormControl('', Validators.required),
         //   password: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            patronymic: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
        });
    }

    onSubmit() {
        const result: User = Object.assign({}, this.userEditForm.value);
        this.userService.updateUser(this.id, result)
            .subscribe(() => {console.log('Submitted!'); this.gotoUserList(); });
    }

    gotoUserList() {
        this.router.navigate(['/dictionaries/users']);
    }
}
