import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../log.service';

import {Templates} from './templates.component.ts';

Logger.get('+Templates').debug('`Templates` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    {
        path: '',
        component: Templates
    }
];

@NgModule({
    declarations: [
        Templates
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class TemplatesModule {
    static routes = routes;
}

