import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../log.service';

import { Dashboard } from './dashboard.component.ts';

Logger.get('+Dashboard').debug('`Dashboard` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    { path: '',
        component: Dashboard
    }
];

@NgModule({
    declarations: [
        Dashboard
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class DashboardModule {
    static routes = routes;
}

