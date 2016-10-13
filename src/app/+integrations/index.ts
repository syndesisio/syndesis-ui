import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../common/service/log';

import {Integrations} from './integrations.component.ts';

Logger.get('+Integrations').debug('`Integrations` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    {
        path: '',
        component: Integrations
    }
];

@NgModule({
    declarations: [
        Integrations
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class IntegrationsModule {
    static routes = routes;
}

