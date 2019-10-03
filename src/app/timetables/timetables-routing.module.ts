import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RetrainingComponent} from './retraining/retraining.component';
import {AuthGuard} from '../shared/helpers/auth.guard';

const timetableRoutes: Routes = [
  //  {path: 'timetables', component: TimetablesComponent},
    {path: 'retraining', component: RetrainingComponent, canActivate: [AuthGuard], children: [

        ]},

];

@NgModule({
  imports: [RouterModule.forChild(timetableRoutes)],
  exports: [RouterModule]
})
export class TimetablesRoutingModule { }
