import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DictionariesComponent} from './dictionaries.component';
import {DisciplineEditComponent} from './disciplines/discipline-edit/discipline-edit.component';
import {DisciplineDetailComponent} from './disciplines/discipline-detail/discipline-detail.component';
import {DisciplineAddComponent} from './disciplines/discipline-add/discipline-add.component';
import {DisciplineListComponent} from './disciplines/discipline-list/discipline-list.component';
import {TeacherListComponent} from './teachers/teacher-list/teacher-list.component';
import {TeacherAddComponent} from './teachers/teacher-add/teacher-add.component';
import {TeacherDetailComponent} from './teachers/teacher-detail/teacher-detail.component';
import {TeacherEditComponent} from './teachers/teacher-edit/teacher-edit.component';
import {ClassroomListComponent} from './classrooms/classroom-list/classroom-list.component';
import {ClassroomAddComponent} from './classrooms/classroom-add/classroom-add.component';
import {ClassroomEditComponent} from './classrooms/classroom-edit/classroom-edit.component';
import {TeacherEditDisciplinesComponent} from './teachers/teacher-edit-disciplines/teacher-edit-disciplines.component';
import {CourseListComponent} from './courses/course-list/course-list.component';
import {CourseAddComponent} from './courses/course-add/course-add.component';
import {CourseEditComponent} from './courses/course-edit/course-edit.component';
import {DepartmentListComponent} from './departments/department-list/department-list.component';
import {DepartmentAddComponent} from './departments/department-add/department-add.component';
import {DepartmentEditComponent} from './departments/department-edit/department-edit.component';
import {DepartmentDetailComponent} from './departments/department-detail/department-detail.component';
import {GroupListComponent} from './groups/group-list/group-list.component';
import {GroupAddComponent} from './groups/group-add/group-add.component';
import {GroupDetailComponent} from './groups/group-detail/group-detail.component';
import {GroupEditComponent} from './groups/group-edit/group-edit.component';
import {LessonPlanEditComponent} from './courses/lesson-plan-edit/lesson-plan-edit.component';


const dictionariesRoutes: Routes = [
    {path: 'dictionaries', component: DictionariesComponent, children: [
            {path: 'disciplines/add', component: DisciplineAddComponent},
            {path: 'disciplines/detail', component: DisciplineDetailComponent},
            {path: 'disciplines/edit/:id', component: DisciplineEditComponent},
            {path: 'disciplines', component: DisciplineListComponent},

            {path: 'teachers', component: TeacherListComponent},
            {path: 'teachers/add', component: TeacherAddComponent},
            {path: 'teachers/detail', component: TeacherDetailComponent},
            {path: 'teachers/edit/:id', component: TeacherEditComponent},
            {path: 'teachers/disciplines/:id', component: TeacherEditDisciplinesComponent},

            {path: 'classrooms', component: ClassroomListComponent},
            {path: 'classrooms/add', component: ClassroomAddComponent},
            {path: 'classrooms/edit/:id', component: ClassroomEditComponent},

            {path: 'courses', component: CourseListComponent},
            {path: 'courses/add', component: CourseAddComponent},
            {path: 'courses/edit/:id', component: CourseEditComponent},
            {path: 'courses/lessonplans/:id', component: LessonPlanEditComponent},

            {path: 'departments', component: DepartmentListComponent},
            {path: 'departments/add', component: DepartmentAddComponent},
            {path: 'departments/edit/:id', component: DepartmentEditComponent},
            {path: 'departments/detail', component: DepartmentDetailComponent},

            {path: 'groups', component: GroupListComponent},
            {path: 'groups/add', component: GroupAddComponent},
            {path: 'groups/detail', component: GroupDetailComponent},
            {path: 'groups/edit/:id', component: GroupEditComponent},
        ]}
];


@NgModule({
    imports: [
        RouterModule.forChild(dictionariesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DictionariesRoutingModule {}
