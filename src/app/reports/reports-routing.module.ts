import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from './reports.component';
import {AuthGuard} from '../shared/helpers/auth.guard';
import {ReportViewComponent} from './report-view/report-view.component';

const routes: Routes = [
    {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]/*, children: [
            {path: 'view', component: ReportViewComponent}
        ]*/},
    {path: 'view', component: ReportsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
