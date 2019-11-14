import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './main/main.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {AuthGuard} from './shared/helpers/auth.guard';
import {Page404Component} from './shared/components/page404/page404.component';
import {AddWorkListComponent} from './additional-work/add-work-list/add-work-list.component';
import {DisciplineEditComponent} from './dictionaries/disciplines/discipline-edit/discipline-edit.component';
import {AddWorkAddComponent} from './additional-work/add-work-add/add-work-add.component';
import {AddWorkEditComponent} from './additional-work/add-work-edit/add-work-edit.component';
import {RetrainingComponent} from './timetables/retraining/retraining.component';
import {BookingComponent} from './timetables/booking/booking.component';
import {Page403Component} from './shared/components/page403/page403.component';



const routes: Routes = [
    {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
    {path: 'main', component: MainComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
    {path: 'sign-in', component: SignInComponent},
    {path: 'addWork', component: AddWorkListComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] } },
    {path: 'addWork/add', component: AddWorkAddComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
    {path: 'addWork/edit/:id', component: AddWorkEditComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
    {path: 'retraining', component: RetrainingComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
    {path: 'booking', component: BookingComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
    {path: '404', component: Page404Component},
    {path: '403', component: Page403Component},

    // в других случаях редирект на 404
     { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
