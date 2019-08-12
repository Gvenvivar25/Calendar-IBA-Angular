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
        ] }
]

@NgModule({
    imports: [
        RouterModule.forChild(dictionariesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DictionariesRoutingModule {}
