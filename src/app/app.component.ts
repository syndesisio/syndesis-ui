/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from './app.service';
import {Logger} from './common/service/log';

import { TruncatePipe } from './common/pipes/truncate';

var log = Logger.get('App');

/*
 * App Component
 * Top Level Component
 */
@Component({
    moduleId: module.id,
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styles: [require('../assets/scss/main.scss')],
    templateUrl: './index.html'
})
export class App {
    name = 'Hawtio iPaaS';

    // White BG
    logoWhiteBg = 'assets/images/RED HAT IPAAS_small.svg';
    iconWhiteBg = 'assets/images/glasses logo.svg';

    // Dark BG
    logoDarkBg = 'assets/images/RED HAT IPAAS_small.svg';
    iconDarkBg = 'assets/images/glasses logo.svg';

    title = 'Red Hat iPaaS';
    url = 'https://www.twitter.com/jboss';
    loggedIn = true;
    //loggedIn = false;
    
    constructor(public appState: AppState) {}
    
    ngOnInit() {
        log.debug('Initial App State', this.appState);
    }
    
}
