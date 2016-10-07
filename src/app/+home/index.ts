import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logger} from '../log.service';

import { Home } from './home.component.ts';

Logger.get('+Home').debug('`Home` bundle loaded asynchronously');

// async components must be named routes for WebpackAsyncRoute
const routes = [
    { path: '', 
      component: Home
    }
];

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        Home,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export default class HomeModule {
    static routes = routes;
}

