import {Component} from '@angular/core';

import {AppState} from '../app.service';
import {Logger} from '../log.service';
import {Title} from '../common/title';

declare var c3: any;
declare var d3: any;
declare var $: any;

var log = Logger.get('Home');

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    // where, in this case, selector is the string 'home'
    selector: 'home',
    providers: [
        Title
    ],
    styles: [require('./home.scss')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './home.html'
})
export class Home {
    // Set our default values
    localState = {value: ''};
    // TypeScript public modifiers
    constructor(public appState: AppState, public title: Title) {}
    
    ngOnInit() {
        log.debug('hello `Home` component');
    }
    
    submitState(value) {
        log.debug('submitState', value);
        this.appState.set('value', value);
        this.localState.value = '';
    }
}
