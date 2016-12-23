import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import * as _ from 'lodash';

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';
import { Router } from '@angular/router';

let log = Logger.get('+connections/library');

@Component({
  selector: 'connections-library',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./library.scss') ],
  templateUrl: './library.html',
  providers: [ ConnectionService ]
})
export class Library implements OnInit {

  limit = 80;
  trail = '..';

  //orderByArray: ['name', 'type'];

  listFilter: string;
  errorMessage: string;

  //@Input() connections: IConnection[];
  connections: IConnection[];


  /**
   * Constructor.
   * @param _router - Router
   * @param _connectionService - ConnectionService
   */
  constructor(private _router: Router,
              private _connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    log.debug('hello `Connections: Library` component');

    this._connectionService.getAll()
      .subscribe(connections => this.connections = connections,
        error => this.errorMessage = <any>error);
  }

  deleteConnection(id: number, $event: any): void {
    log.debug('Deleting: ' + JSON.stringify(id));

    this._connectionService.del(id);
  }

  duplicateConnection(connection: IConnection, $event: any): void {
    // Remove ID from Connection instance
    connection.id = null;

    this._connectionService.create(connection);
  }

  editConnection(connection: IConnection, $event: any): void {
    //log.debug('Connection: ', connection);

    if(connection && connection.name) {
      let link = [ 'connections', 'edit', connection.id ];

      this._router.navigate(link);
    }
  }

  goBack(): void {
    this._router.navigate(['/dashboard']);
  }

  gotoDetail(connection: IConnection, $event: any): void {
    //log.debug('$event: ', $event);

    let className = _.get($event, 'target.className');

    //log.debug('Class name: ', className);

    if ($event && $event.target && $event.target.className.indexOf('dropdown-toggle') !== -1) {
      return;
    }

    log.debug('Connection: ', connection);

    let link = [ 'connections', 'detail', connection.id ];

    this._router.navigate(link);
  }

  sort(): void {
    //this.connections = !this.showImage;
  }

}
