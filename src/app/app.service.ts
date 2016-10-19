import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import {Logger} from './common/service/log';

// defer initializing this, otherwise 'Logger' is undefined
var log = undefined;

@Injectable()
export class AppState {
    
    private configJson = 'config.json';
    config: any = {};
    
    _state = {};
    
    constructor(private http: Http) {
        log = Logger.get('AppState');
    }
    
    // Used to load settings from the server, returns a promise so angular waits
    // during bootstrap.  Log is passed in here to help avoid circular dependencies
    load(self: AppState): Promise<AppState> {
        var promise = self.http.get(self.configJson).map(res => res.json()).toPromise();
        
        promise.then((config) => {
            log.debug('Using configuration: ', config);
            self.config = config;
            return self;
        });
        
        return promise;
    }
    
    // already return a clone of the current state
    get state() {
        return this._state = this._clone(this._state);
    }
    
    // never allow mutation
    set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }
    
    
    get(prop?: any) {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : undefined;
    }
    
    set(prop: string, value: any) {
        // internally mutate our state
        return this._state[prop] = value;
    }
    
    _clone(object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    }
    
}
