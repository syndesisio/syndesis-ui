import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';

var log = Logger.get('+connections/detail');

@Component({
    moduleId: module.id,
    selector: 'connections-detail',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [ 'detail.scss' ],
    templateUrl: 'detail.html',
    providers: [ ConnectionService ]
})
export class Detail implements OnInit {

    connection: IConnection;
    errorMessage: string;

    /**
     * Constructor.
     * @param _connectionService - ConnectionService
     */
    constructor(private _connectionService: ConnectionService) {
        this.getConnection();
    }

    ngOnInit(): void {
        log.debug('hello `Connections: Detail` component');
    }

    getConnection() {
        /*
        this._connectionService.get()
          .subscribe(
            connections => this.connections = connections,
            error => this.errorMessage = <any>error);
            */
    }

}
