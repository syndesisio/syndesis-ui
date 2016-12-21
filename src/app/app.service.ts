import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import * as _ from 'lodash';

import { Logger } from './common/service/log';
import { Globals } from './app.config';

// defer initializing this, otherwise 'Logger' is undefined
let log: any = undefined;

// the location of the config file
let configJson = 'config.json';

@Injectable()
export class AppState {

  _state = Globals;

  /**
   * Constructor.
   * @param http - HTTP
   */
  constructor(private http: Http) {
    log = Logger.get('AppState');
  }

  // Used to load settings from the server, returns a promise so angular waits
  // during bootstrap. Log is passed in here to help avoid circular dependencies
  load(): Promise<AppState> {
    let promise = this.http.get(configJson).map(res => res.json()).toPromise();

    promise.then((config) => {
      //log.debug('Using configuration: ', config);
      this._state = _.merge({}, this._state, config);

      return this;
    });

    return promise;
  }

  // already return a clone of the current state
  get state() {
    return this._state = _.clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop: string, resetFromStorage?: boolean): any {
    // use our state getter for the clone
    const state = this.state;

    if (resetFromStorage) {
      this.set(prop, undefined);
    }

    let answer: any = _.get(state, prop);

    if (!answer) {
      // check local storage
      answer = localStorage.getItem(prop);

      if (answer && _.startsWith(answer, '{') || _.startsWith(answer, '[')) {
        try {
          answer = JSON.parse(answer);
        } catch (err) {
          // we'll just return answer as a string
        }
      }

      this.set(prop, answer);
    }

    return answer;
  }

  clear(prop: string, persist?: boolean): any {
    _.set(this._state, prop, undefined);

    if (persist) {
      localStorage.removeItem(prop);
    }
  }

  set(prop: string, value: any, persist?: boolean): any {
    let val = value;

    // internally mutate our state
    _.set(this._state, prop, value);

    if (persist) {
      if (!_.isString(value)) {
        value = JSON.stringify(value);
      }

      localStorage.setItem(prop, value);
    }

    return val;
  }

}
