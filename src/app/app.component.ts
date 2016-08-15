/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {ViewEncapsulation} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';

import {AppState} from './app.service';
import {RouterActive} from './router-active';

// Routes

import {APIs} from './apis';
import {ClientApps} from './clientApps';
import {Dashboard} from './dashboard';
import {Home} from './home';
import {Login} from './user';
import {Portal} from './apiPortal';
import {Profile} from './user';
import {Register} from './user';
import {Reset} from './user';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    pipes: [],
    providers: [],
    directives: [RouterActive],
    styles: [
        require('../assets/scss/main.scss')
    ],
    encapsulation: ViewEncapsulation.None,
    template: require('./index.html')
})
@RouteConfig([
    {path: '/', name: 'Home', component: Home, useAsDefault: true},
    {path: '/apis', name: 'APIs', component: APIs},
    {path: '/apps', name: 'Client Apps', component: ClientApps},
    {path: '/dashboard', name: 'Dashboard', component: Dashboard},
    {path: '/login', name: 'Login', component: Login},
    {path: '/portal', name: 'API Portal', component: Portal},
    {path: '/profile', name: 'Profile', component: Profile},
    {path: '/register', name: 'Register', component: Register},
    {path: '/reset', name: 'Reset Password', component: Reset}
])
export class App {
    logoWhiteBg = 'assets/img/dev-portal-logo-01.png';
    logoDarkBg = 'assets/img/dev-portal-logo-02.png';
    title = 'Developer Portal';
    url = 'https://twitter.com/apiman_io';
    loggedIn = true;
    //loggedIn = false;
    
    constructor(public appState:AppState) {
    }

    get state() {
        return this.appState.get();
    }

    ngOnInit() {
        console.log('Initial App State', this.state);
    }

}
