import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReportsComponent} from './reports.component';

@NgModule({
  declarations: [
      ReportsComponent
  ],
  imports: [
      CommonModule,
      ReportsRoutingModule,
      ReactiveFormsModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgSelectModule,
  ]
})
export class ReportsModule { }
