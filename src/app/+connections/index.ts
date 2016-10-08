import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../log.service';

import { Connections } from './connections.component.ts';

Logger.get('+Connections').debug('`Connections` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    { path: '',
        component: Connections
    }
];

@NgModule({
    declarations: [
        Connections
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class ConnectionsModule {
    static routes = routes;
}

