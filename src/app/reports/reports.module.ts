import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {ReportsComponent} from './reports.component';

import {SheetJSComponent} from './sheetjs.component';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import { NgxDocViewerComponent } from './ngx-doc-viewer/ngx-doc-viewer.component';
import { ReportViewComponent } from './report-view/report-view.component';
import { ReportListComponent } from './report-list/report-list.component';


@NgModule({
  declarations: [
      ReportsComponent,
      SheetJSComponent,
      NgxDocViewerComponent,
      ReportViewComponent,
      ReportListComponent,

  ],
  imports: [
      CommonModule,
      ReportsRoutingModule,
      ReactiveFormsModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgSelectModule,
      NgxDocViewerModule,
]
})
export class ReportsModule { }
