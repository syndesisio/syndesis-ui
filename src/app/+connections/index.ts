import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../common/directives';

import { Logger } from '../common/service/log';
import { Connections } from './connection.component';
import { Create } from './create/create.component';
import { Edit } from './edit/edit.component';
import { Detail } from './detail/detail.component';
import { Library } from './library/library.component';

// Pipes
import { Truncate } from '../common/pipes/truncate';
import { ConnectionFilter } from './connection.pipe';
import { OrderBy } from '../common/pipes/orderBy';

Logger.get('+Connections').debug('`Connections` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    {
        path: '',
        component: Connections,
        children: [
            {path: '', component: Library},
            {path: 'create', component: Create},
            {path: 'edit/:id', component: Edit},
            {path: 'detail/:id', component: Detail}
        ]
    }
];

@NgModule({
    declarations: [
        Connections,
        Create,
        Edit,
        Detail,
        Library,

        // Pipes
        ConnectionFilter,
        OrderBy,
        Truncate
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        RouterModule.forChild(routes),
    ]
})
export default class ConnectionsModule {
    static routes = routes;
}



