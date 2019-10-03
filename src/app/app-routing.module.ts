import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './main/main.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {AuthGuard} from './shared/helpers/auth.guard';

const routes: Routes = [
    {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
    {path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    {path: 'sign-in', component: SignInComponent},
  //  {path: 'retraining', component: RetrainingComponent},

    // в других случаях редирект на главную страницу
   // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
