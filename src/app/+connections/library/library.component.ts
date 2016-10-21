import {Component, ViewEncapsulation} from '@angular/core';

import {Connection} from '../connection.model';
import {ConnectionService} from '../connection.service';

import {Logger} from '../../common/service/log';
import {Router} from '@angular/router';

var log = Logger.get('+connections/library');

@Component({
    moduleId: module.id,
    selector: 'connections-library',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./library.scss')],
    templateUrl: './library.html',
    providers: [ ConnectionService ]
})
export class Library {
    
    connections: Connection[] = [];
    errorMessage: string;
    
    constructor(private router: Router,
                private connectionService: ConnectionService) {}
    
    ngOnInit() {
        log.debug('hello `Connections: Library` component');
        
        this.getConnections();
    }
    
    getConnections() {
        this.connectionService.getConnections()
          .subscribe(
            connections => this.connections = connections,
            error => this.errorMessage = <any>error);
    }
    
    gotoDetail(connection: Connection): void {
        let link = ['/detail', connection.id];
        this.router.navigate(link);
    }
    
}
