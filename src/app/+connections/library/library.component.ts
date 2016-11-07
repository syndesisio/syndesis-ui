import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

import {Connection} from '../connection.model';
import {ConnectionService} from '../connection.service';

import {Logger} from '../../common/service/log';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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
    
    connections: Connection[] = [];
    errorMessage: string;
    
    @Input() connections: Connection[];
    //@Input() selectedConnections: Connection[];
    //@Output() onConnectionSelected: EventEmitter<Connection> = new EventEmitter<Connection>();
    
    constructor(private router: Router,
                private connectionService: ConnectionService) {}
    
    ngOnInit() {
        log.debug('hello `Connections: Library` component');
        
        this.getConnections();
    }
    
    getConnections() {
        this.connectionService.getAll()
          .subscribe(
            connections => this.connections = connections,
            error => this.errorMessage = <any>error);
    }
    
    gotoDetail(connection: Connection): void {
        let link = ['/detail', connection.id];
        //this.onConnectionSelected.emit(connection); // For action when selecting
        this.router.navigate(link);
    }
    
}
