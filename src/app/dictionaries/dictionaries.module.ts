import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DictionariesRoutingModule} from './dictionaries-routing.module';
import {DictionariesComponent} from './dictionaries.component';
import { DisciplineDetailComponent } from './disciplines/discipline-detail/discipline-detail.component';
import { DisciplineAddComponent } from './disciplines/discipline-add/discipline-add.component';
import {DisciplinesService} from '../shared/services/disciplines.service';
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
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { LessonPlanEditComponent } from './courses/lesson-plan-edit/lesson-plan-edit.component';
import { EmployeeAddComponent } from './employees/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { GroupAddStudentsComponent } from './groups/group-add-students/group-add-students.component';
import { UserRoleComponent } from './users/user-role/user-role.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

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
        GroupDetailComponent,
        CourseDetailComponent,
        LessonPlanEditComponent,
        EmployeeAddComponent,
        EmployeeEditComponent,
        EmployeeListComponent,
        EmployeeDetailComponent,
        UserListComponent,
        UserAddComponent,
        UserEditComponent,
        GroupAddStudentsComponent,
        UserRoleComponent
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
        ColorPickerModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            closeButton: true,
        })

    ],
    providers: [DisciplinesService]
})
export class DictionariesModule {}
