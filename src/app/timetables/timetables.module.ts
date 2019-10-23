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
import { TimetableComponent } from './timetable/timetable.component';
import { TimetableDetailComponent } from './timetable/timetable-detail/timetable-detail.component';

@NgModule({
  declarations: [
      TimetablesComponent,
      RetrainingComponent,
      TimetableComponent,
      TimetableDetailComponent
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
