import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWorkRoutingModule } from './add-work-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';
import {AddWorkListComponent} from './add-work-list/add-work-list.component';
import {AddWorkAddComponent} from './add-work-add/add-work-add.component';
import {AddWorkEditComponent} from './add-work-edit/add-work-edit.component';


@NgModule({
  declarations: [
      AddWorkListComponent,
      AddWorkAddComponent,
      AddWorkEditComponent,

  ],
  imports: [
      CommonModule,
      AddWorkRoutingModule,
      ReactiveFormsModule,
      BrowserModule,
      HttpClientModule,
      FormsModule,
      NgSelectModule,
]
})
export class AddWorkModule { }
