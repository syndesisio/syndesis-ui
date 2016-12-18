/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { Logger } from './common/service/log';

let log = Logger.get('App');

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styles: [ require('../assets/scss/main.scss') ],
    templateUrl: './index.html'
})
export class App {
    name = 'Red Hat iPaaS';

    // White BG
    logoWhiteBg = 'assets/images/rh_ipaas_small.svg';
    iconWhiteBg = 'assets/images/glasses_logo.svg';

    // Dark BG
    logoDarkBg = 'assets/images/rh_ipaas_small.svg';
    iconDarkBg = 'assets/images/glasses_logo.svg';

    title = 'Red Hat iPaaS';
    url = 'https://www.twitter.com/jboss';
    loggedIn = true;
    //loggedIn = false;

    /**
     * Constructor.
     */
    constructor(public appState: AppState) {}

    ngOnInit() {
        log.debug('Initial App State', this.appState);
    }

}
