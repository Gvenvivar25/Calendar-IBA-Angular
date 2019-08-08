import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DictionariesComponent} from './dictionaries.component';
import {DisciplineListComponent} from './disciplines/discipline-list/discipline-list.component';
import {DisciplineDetailComponent} from './disciplines/discipline-detail/discipline-detail.component';
import {DisciplineAddComponent} from './disciplines/discipline-add/discipline-add.component';
import {DisciplineEditComponent} from './disciplines/discipline-edit/discipline-edit.component';


const dictionariesRoutes: Routes = [
    {path: 'dictionaries', component: DictionariesComponent, children: [
            {path: 'disciplines', component: DisciplineListComponent, children: [
                    {path: 'edit/:id', component: DisciplineEditComponent},
                    {path: 'add', component: DisciplineAddComponent},
                    {path: ':id/:disciplineName', component: DisciplineDetailComponent},
             ]},
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
