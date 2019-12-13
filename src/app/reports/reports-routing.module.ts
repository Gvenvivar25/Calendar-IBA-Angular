import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../shared/helpers/auth.guard';
import {ReportViewComponent} from './report-view/report-view.component';
import {ReportListComponent} from './report-list/report-list.component';

const routes: Routes = [
    {path: 'reports', component: ReportListComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER', 'ROLE_VIEW', 'ROLE_GROUP'] }},
    {path: 'reports/:name', component: ReportViewComponent, canActivate: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MANAGER', 'ROLE_VIEW', 'ROLE_GROUP'] }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
