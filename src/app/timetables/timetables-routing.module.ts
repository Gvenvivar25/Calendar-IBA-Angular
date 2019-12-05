import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RetrainingComponent} from './retraining/retraining.component';
import {AuthGuard} from '../shared/helpers/auth.guard';
import {BookingComponent} from './booking/booking.component';

const timetableRoutes: Routes = [
    {path: 'retraining', component: RetrainingComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},
    {path: 'booking', component: BookingComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MANAGER'] }},

];

@NgModule({
  imports: [RouterModule.forChild(timetableRoutes)],
  exports: [RouterModule]
})
export class TimetablesRoutingModule { }
