import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class AppState {
    
    private configJson = 'config.json';
    config:any = {};

    _state = {};
    
    constructor(private http: Http) {

    }

    load(self:AppState):Promise<AppState> {
      var promise = self.http.get(self.configJson)
                             .map(res => res.json()).toPromise();
      promise.then((config) => {
        console.log("Loaded configuration: ", config);
        self.config = config
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
        return state.hasOwnProperty(prop) ? state[prop] : state;
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
