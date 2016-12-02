import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import * as _ from 'lodash';

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';
import { Router } from '@angular/router';

let log = Logger.get('+connections/library');

@Component({
  moduleId: module.id,
  selector: 'connections-library',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./library.scss') ],
  templateUrl: './library.html',
  providers: [ ConnectionService ]
})
export class Library implements OnInit {

  limit = 80;
  trail = '..';

  orderByArray: ['name', 'type'];

  listFilter: string;
  errorMessage: string;

  //@Input() connections: IConnection[];
  connections: IConnection[];


  /**
   * Constructor.
   * @param router - Router
   * @param _connectionService - ConnectionService
   */
  constructor(private router: Router,
              private _connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    log.debug('hello `Connections: Library` component');

    //this.getConnections();
    this._connectionService.getAll()
      .subscribe(connections => this.connections = connections,
        error => this.errorMessage = <any>error);
  }

  deleteConnection(connection: IConnection, $event: any): void {
    this._connectionService.del(connection.id);
  }

  duplicateConnection(connection: IConnection, $event: any): void {
    // Remove ID from Connection instance
    connection.id = null;

    this._connectionService.create(connection);
  }

  editConnection(connection: IConnection, $event: any): void {
    console.log('Connection: ', connection);

    let link = [ 'connections', 'edit', connection.name.toLowerCase() ];

    this.router.navigate(link);
  }

  getConnections() {
    this._connectionService.getAll();
  }

  gotoDetail(connection: IConnection, $event: any): void {
    console.log('$event: ', $event);

    let className = _.get($event, 'target.className');

    console.log('Class name: ', className);

    if ($event && $event.target && $event.target.className.indexOf('dropdown-toggle') !== -1) {
      return;
    }

    console.log('Connection: ', connection);

    let link = [ 'connections', 'detail', connection.name.toLowerCase() ];

    this.router.navigate(link);
  }

  sort(): void {
    //this.connections = !this.showImage;
  }

}
