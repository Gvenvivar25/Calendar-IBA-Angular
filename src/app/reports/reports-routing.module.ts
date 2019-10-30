import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from './reports.component';
import {AuthGuard} from '../shared/helpers/auth.guard';
import {ReportViewComponent} from './report-view/report-view.component';
import {ReportListComponent} from './report-list/report-list.component';

const routes: Routes = [
    {path: 'reports', component: ReportListComponent, canActivate: [AuthGuard]/*, children: [
            {path: 'view', component: ReportViewComponent}
        ]*/},
    {path: 'reports/:name', component: ReportViewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
