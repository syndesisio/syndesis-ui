/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';

import {AppState} from './app.service';

require('../assets/scss/main.scss');

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    /*
     styleUrls: [
     './app.style.css'
     ],
     */
    templateUrl: './index.html'
})
export class App {
    name = 'Hawtio iPaaS';
    logoWhiteBg = 'assets/img/brand.svg';
    logoDarkBg = 'assets/img/brand.svg';
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

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */

