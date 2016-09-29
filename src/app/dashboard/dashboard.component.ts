import {Component} from '@angular/core';

import {AppState} from '../app.service';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    selector: 'dashboard',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [],
    styles: [ require('./dashboard.scss') ],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './dashboard.html'
})
export class Dashboard {
    // Set our default values
    localState = '';
    
    // TypeScript public modifiers
    constructor(public appState: AppState) {}
    
    ngOnInit() {
        console.log('Loaded `Dashboard` component');
    }
    
    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
    }
}
