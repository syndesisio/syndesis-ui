import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';
import { Router } from '@angular/router';

var log = Logger.get('+connections/library');

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

  listFilter: string;
  errorMessage: string;

  @Input() connections: IConnection[];


  /**
   * Constructor.
   * @param router - Router
   * @param _connectionService - ConnectionService
   */
  constructor(private router: Router,
              private _connectionService: ConnectionService) {
  }

  ngOnInit() {
    log.debug('hello `Connections: Library` component');

    this.getConnections();
  }

  deleteConnection(connection: IConnection, $event: any): void {
  }

  duplicateConnection(connection: IConnection, $event: any): void {
  }

  editConnection(connection: IConnection, $event: any): void {
    if ($event.target.className.indexOf('dropdown-toggle') !== -1) {
      return;
    }

    console.log('Connection: ', connection);

    let link = [ '/detail', connection.name ];
    this.router.navigate(link);
  }

  getConnections() {
    this._connectionService.getAll()
      .subscribe(
        connections => this.connections = connections,
        error => this.errorMessage = <any>error);
  }

  gotoDetail(connection: IConnection, $event: any): void {
    if ($event.target.className.indexOf('dropdown-toggle') !== -1) {
      return;
    }

    console.log('Connection: ', connection);

    let link = [ '/detail', connection.name ];
    this.router.navigate(link);
  }

}
