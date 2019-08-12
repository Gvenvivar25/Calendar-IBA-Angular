import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DictionariesComponent} from './dictionaries.component';
import {DisciplineEditComponent} from './disciplines/discipline-edit/discipline-edit.component';
import {DisciplineDetailComponent} from './disciplines/discipline-detail/discipline-detail.component';
import {DisciplineAddComponent} from './disciplines/discipline-add/discipline-add.component';
import {DisciplineListComponent} from './disciplines/discipline-list/discipline-list.component';


const dictionariesRoutes: Routes = [
    {path: 'dictionaries', component: DictionariesComponent, children: [
            {path: 'disciplines/add', component: DisciplineAddComponent},
            {path: 'disciplines/detail', component: DisciplineDetailComponent},
            {path: 'disciplines/edit/:id', component: DisciplineEditComponent},

            {path: 'disciplines', component: DisciplineListComponent},
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
