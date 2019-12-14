import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../shared/helpers/auth.guard';
import {AddWorkListComponent} from './add-work-list/add-work-list.component';
import {AddWorkAddComponent} from './add-work-add/add-work-add.component';
import {AddWorkEditComponent} from './add-work-edit/add-work-edit.component';

const routes: Routes = [
    {path: 'addWork', component: AddWorkListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_VIEW'] } },
    {path: 'addWork/add', component: AddWorkAddComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
    {path: 'addWork/edit/:id', component: AddWorkEditComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddWorkRoutingModule { }
