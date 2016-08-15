import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {Http, Response} from 'angular2/http';
//import {Observable} from 'rxjs/Rx';

import {Title} from './title';
import {XLarge} from './x-large';

@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    selector: 'clientApps',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        Title
    ],
    // We need to tell Angular's compiler which directives are in our template.
    // Doing so will allow Angular to attach our behavior to an element
    directives: [
        XLarge
    ],
    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together
    styles: [require('./clientApps.scss')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./clientApps.html')
})
export class ClientApps {
    // Set our default values
    localState = '';
    pageTitle:string = 'Client Apps';
    clientApps:string; // Did not have to declare `public` here, it is public by default

    // TypeScript public modifiers
    constructor(private http:Http, public appState:AppState, public title:Title) {
    }

    ngOnInit() {
        console.log('Loaded `ClientApps` component');
    }


    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
    }

}
