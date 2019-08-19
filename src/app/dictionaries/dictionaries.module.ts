import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DictionariesRoutingModule} from './dictionaries-routing.module';
import {DictionariesComponent} from './dictionaries.component';
import { DisciplineDetailComponent } from './disciplines/discipline-detail/discipline-detail.component';
import { DisciplineAddComponent } from './disciplines/discipline-add/discipline-add.component';
import {DisciplinesService} from './disciplines/disciplines.service';
import { DisciplineEditComponent } from './disciplines/discipline-edit/discipline-edit.component';
import {DisciplineListComponent} from './disciplines/discipline-list/discipline-list.component';
import {SidebarModule} from 'ng-sidebar';
import { TeacherAddComponent } from './teachers/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './teachers/teacher-edit/teacher-edit.component';
import { TeacherListComponent } from './teachers/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './teachers/teacher-detail/teacher-detail.component';
import {CommonModule} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClassroomListComponent } from './classrooms/classroom-list/classroom-list.component';
import { ClassroomAddComponent } from './classrooms/classroom-add/classroom-add.component';
import { ClassroomEditComponent } from './classrooms/classroom-edit/classroom-edit.component';
import { TeacherEditDisciplinesComponent } from './teachers/teacher-edit-disciplines/teacher-edit-disciplines.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { DepartmentListComponent } from './departments/department-list/department-list.component';
import { DepartmentAddComponent } from './departments/department-add/department-add.component';
import { DepartmentEditComponent } from './departments/department-edit/department-edit.component';
import { DepartmentDetailComponent } from './departments/department-detail/department-detail.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupAddComponent } from './groups/group-add/group-add.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';

@NgModule ({
    declarations: [
        DisciplineListComponent,
        DictionariesComponent,
        DisciplineDetailComponent,
        DisciplineAddComponent,
        DisciplineEditComponent,
        TeacherAddComponent,
        TeacherEditComponent,
        TeacherListComponent,
        TeacherDetailComponent,
        ClassroomListComponent,
        ClassroomAddComponent,
        ClassroomEditComponent,
        TeacherEditDisciplinesComponent,
        CourseListComponent,
        CourseAddComponent,
        CourseEditComponent,
        DepartmentListComponent,
        DepartmentAddComponent,
        DepartmentEditComponent,
        DepartmentDetailComponent,
        GroupListComponent,
        GroupAddComponent,
        GroupEditComponent,
        GroupDetailComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        DictionariesRoutingModule,
        SidebarModule.forRoot(),
        NgSelectModule,

    ],
    providers: [DisciplinesService]
})
export class DictionariesModule {}
