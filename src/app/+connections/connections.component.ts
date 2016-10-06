import {Component} from '@angular/core';

import { Logger } from '../log.service';

var log = Logger.get('+connections');

@Component({
    selector: 'connections',
    styles: [ require('./connections.scss') ],
    templateUrl: './connections.html'
})
export class Connections {

    constructor() {}
    
    ngOnInit() {
      log.debug('hello `Connections` component');
    }


    
}
