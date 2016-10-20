import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {Connection} from './connection.model';
import {ConnectionService} from './connection.service';

import {Logger} from '../common/service/log';

var log = Logger.get('+connections');

@Component({
    selector: 'connections',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `<router-outlet></router-outlet>`
})
export class Connections {
    
    constructor() {}
    
    ngOnInit() {
        log.debug('hello `Connections` component');
    }
    
}
