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

  private iconDarkBg: string;
  private iconWhiteBg: string;
  private logoDarkBg: string;
  private logoWhiteBg: string;
  private twitterUrl: string;
  private loggedIn = true;
  //private loggedIn = false;
  private title: string;

  /**
   * Constructor.
   * @param _appState -- AppState
   */
  constructor(private _appState: AppState) {
    this.iconDarkBg = _appState.state.iconDarkBg;
    this.logoDarkBg = _appState.state.logoDarkBg;
    this.title = _appState.state.title;
  }

  ngOnInit() {
    log.debug('Initial App State', this._appState);
  }

}
