import {Component, OnInit} from 'angular2/core';
import {AppState} from '../../app.service';

import {Title} from '../title';
import {XLarge} from '../x-large';

declare var c3:any;
declare var $:any;


@Component({
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    selector: 'login',
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
    styles: [require('./login.scss')],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./login.html')
})
export class Login implements OnInit {
    // Set our default values
    localState = '';
    loggedIn = false;
    pageTitle: string = 'Sign In';

    // TypeScript public modifiers
    constructor(public appState:AppState, public title:Title) {

    }

    ngOnInit() {
        console.log('Loaded `Login` component');
        // this.title.getData().subscribe(data => this.data = data);
    }

    submitState(value) {
        console.log('submitState', value);
        this.appState.set('value', value);
    }

}
