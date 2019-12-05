import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    users: User [];

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        return this.userService.getUsers()
            .subscribe((data: User[]) => {
                this.users = data;
            });
    }

    onDeleteUser(user: User) {
        this.userService.deleteUser(user.id).subscribe(() => {
            this.loadUsers();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }

// цвет строки пользователя в зависимости от статуса
    setUserColor(status) {
        switch (status) {
            case 'ACTIVE':
                return 'green';
            case 'NOT_ACTIVE':
                return 'blue';
            case 'DELETED':
                return 'red';
        }
    }

}
