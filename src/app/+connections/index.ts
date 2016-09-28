import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../log.service';
import {Connections} from './connections.component';

Logger.get('+connections').debug('`Connections` bundle loaded asynchronously');
// async components must be named routes for WebpackAsyncRoute
export const routes = [
    { path: '', component: Connections, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        Connections
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export default class AboutModule {
    static routes = routes;
}
