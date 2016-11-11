import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { DirectivesModule } from '../common/directives';

import {Logger} from '../common/service/log';
import {Connections} from './connection.component';
import {Create} from './create/create.component';
import {Detail} from './detail/detail.component';
import {Library} from './library/library.component';

// Pipes
import { TruncatePipe } from '../common/pipes/truncate';
import { ConnectionFilterPipe } from './connection.pipe';

Logger.get('+Connections').debug('`Connections` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    {
        path: '',
        component: Connections,
        children: [
            {path: '', component: Library},
            {path: 'create', component: Create},
            {path: 'detail', component: Detail}
        ]
    }
];

@NgModule({
    declarations: [
        Connections,
        Create,
        Detail,
        Library,

      // Pipes
        ConnectionFilterPipe,
        TruncatePipe
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



