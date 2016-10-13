import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from './../common/service/log';

import {Admin} from './admin.component.ts';

Logger.get('+Admin').debug('`Admin` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    {
        path: '',
        component: Admin
    }
];

@NgModule({
    declarations: [
        Admin
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class AdminModule {
    static routes = routes;
}

