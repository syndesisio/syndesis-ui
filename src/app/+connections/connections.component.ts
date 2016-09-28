import {Component} from '@angular/core';

import { Logger } from '../log.service';

var log = Logger.get('+connections');

@Component({
    selector: 'connections',
    template: `
    <h1>Hello from Connections</h1>
    <router-outlet></router-outlet>
  `
})
export class Connections {

    constructor() {

    }
    
    ngOnInit() {
      log.debug('hello `Connections` component');
    }


    
}
