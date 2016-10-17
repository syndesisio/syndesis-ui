import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../common/service/log';

import {Connections} from './connections.component.ts';

import {Library} from './library/library.component';

Logger.get('+Connections').debug('`Connections` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    {
        path: '',
        component: Connections,
        children: [
            { path: 'library', component: Library }
        ]
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



