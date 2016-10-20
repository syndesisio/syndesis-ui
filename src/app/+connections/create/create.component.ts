import {Component, ViewEncapsulation} from '@angular/core';

import {Connection} from '../connection.model';
import {ConnectionService} from '../connection.service';

import {Logger} from '../../common/service/log';

var log = Logger.get('+connections/create');

@Component({
    moduleId: module.id,
    selector: 'connections-create',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./create.scss')],
    templateUrl: './create.html'
})
export class Create {
    
    connections: Connection[] = [];
    errorMessage: string;
    
    constructor(private connectionService: ConnectionService) {
    }
    
    ngOnInit() {
        log.debug('hello `Connections: Create` component');
    }
    
    /*
    addConnection(name: string) {
        if (!name) {
            return;
        }
        
        this
          .connectionService
          .addConnection(name)
          .subscribe(
            connection => this.connections.push(connection),
            error => this.errorMessage = <any>error);
    }
    */
    
}
