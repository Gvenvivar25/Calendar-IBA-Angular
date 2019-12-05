import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleDto, RoleName, User} from '../../../shared/models/user.model';
import {UserService} from '../../../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
    userRoleForm: FormGroup;
    roles: RoleName[];
    userRoles: RoleDto[];
    id: number;
    username: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
      this.userRoleForm = this.formBuilder.group({
          role: [[], Validators.required],
      });
  }

  ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.userService.getAllRoles().subscribe((res: RoleName[]) => {
          this.roles = res;
      });
      this.getUser(this.id);
      this.getUserRole(this.id);
  }

  getUser(id) {
      this.userService.getUser(id).subscribe((res: User) => {
          this.username = res.username;
      });
  }
  getUserRole(id) {
      this.userService.getAllRolesOfUser(id).subscribe((res: RoleDto[]) => {
          this.userRoles = res;
      });
  }

    gotoUsersList() {
        this.router.navigate(['/dictionaries/users']);
    }

    onAdd() {
      const result = Object.assign({}, this.userRoleForm.value);
      const role = result.role.id;
      this.userService.addRoleToUser(this.id, role).subscribe(() => this.getUserRole(this.id));
    }

    onDeleteRole(idRole: string) {
        this.userService.deleteUserRole(this.id, idRole).subscribe(
            () => {console.log('Role is deleted');
                   this.getUserRole(this.id);
            });

    }

}
