import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Connection} from '../connection.model';
import {ConnectionService} from '../connection.service';
import {Logger} from '../../common/service/log';

var log = Logger.get('+connections/library');

@Component({
    moduleId: module.id,
    selector: 'connections-library',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./library.scss')],
    templateUrl: './library.html',
    providers: [ ConnectionService ]
})
export class Library implements OnInit {
    
    errorMessage: string;
    connections: Connection[];
    
    constructor(private connectionService: ConnectionService) {}
    
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
    
    addConnection(name: string) {
        if (!name) {
            return;
        }
        this.connectionService.addConnection(name)
          .subscribe(
            connection => this.connections.push(connection),
            error => this.errorMessage = <any>error);
    }
    
}
