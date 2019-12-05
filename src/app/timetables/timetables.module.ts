import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetablesRoutingModule } from './timetables-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { RetrainingComponent } from './retraining/retraining.component';
import {SidebarModule} from 'ng-sidebar';
import {FullCalendarModule} from '@fullcalendar/angular';
import {NgSelectModule} from '@ng-select/ng-select';
import {AngularDraggableModule} from 'angular2-draggable';
import { TimetableComponent } from './retraining/timetable/timetable.component';
import { TimetableDetailComponent } from './booking/timetable-detail/timetable-detail.component';
import { BookingComponent } from './booking/booking.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { TimetableConfirmComponent } from './retraining/timetable-confirm/timetable-confirm.component';

@NgModule({
  declarations: [
      RetrainingComponent,
      TimetableComponent,
      TimetableDetailComponent,
      BookingComponent,
      TimetableConfirmComponent
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
      AngularDraggableModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
          closeButton: true,
      })
  ]
})
export class TimetablesModule { }
