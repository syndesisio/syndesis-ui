/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from './app.service';

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
    name = 'Hawtio iPaaS';
    logoWhiteBg = 'assets/images/brand.svg';
    logoDarkBg = 'assets/images/brand.svg';
    title = 'iPaaS';
    url = 'https://www.twitter.com/jboss';
    loggedIn = true;
    //loggedIn = false;
    
    constructor(public appState: AppState) {
        
    }
    
    ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }
    
}
