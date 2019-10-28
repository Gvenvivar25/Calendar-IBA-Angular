import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RetrainingComponent} from './retraining/retraining.component';
import {AuthGuard} from '../shared/helpers/auth.guard';
import {BookingComponent} from './booking/booking.component';

const timetableRoutes: Routes = [
  //  {path: 'timetables', component: TimetablesComponent},
    {path: 'retraining', component: RetrainingComponent, canActivate: [AuthGuard]},
    {path: 'courses', component: RetrainingComponent, canActivate: [AuthGuard]},
    {path: 'booking', component: BookingComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(timetableRoutes)],
  exports: [RouterModule]
})
export class TimetablesRoutingModule { }
