import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetablesRoutingModule } from './timetables-routing.module';
import {TimetablesComponent} from './timetables.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RetrainingComponent } from './retraining/retraining.component';
import {SidebarModule} from 'ng-sidebar';
import {FullCalendarModule} from '@fullcalendar/angular';
import {NgSelectModule} from '@ng-select/ng-select';
import {AngularDraggableModule} from 'angular2-draggable';

@NgModule({
  declarations: [
      TimetablesComponent,
      RetrainingComponent
  ],
  imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        TimetablesRoutingModule,
        SidebarModule.forRoot(),
        FullCalendarModule,
        NgSelectModule,
      AngularDraggableModule
  ]
})
export class TimetablesModule { }
