import {Component} from '@angular/core';

import { Logger } from '../log.service';

var log = Logger.get('+connections');

@Component({
    selector: 'connections',
    templateUrl: './connections.html'
})
export class Connections {

    constructor() {

    }
    
    ngOnInit() {
      log.debug('hello `Connections` component');
    }


    
}
