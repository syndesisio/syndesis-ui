import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// Models
import { IConnection } from '../+connections/connection.model';

// Services
import { ConnectionService } from '../+connections/connection.service';
import { Logger } from '../common/service/log';

let log = Logger.get('+connections');

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  selector: 'dashboard',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    ConnectionService
  ],
  styles: [ require('./dashboard.scss') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  // Set our default values
  localState = '';
  errorMessage: string;

  @Input() connections: IConnection[];

  /**
   * Constructor.
   * @param _router - Router
   * @param _connectionService - ConnectionService
   */
  constructor(private _router: Router, private _connectionService: ConnectionService) {
  }

  ngOnInit() {
    log.debug('Loaded `Dashboard` component');

    this.getConnections();
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

    log.debug('Connection: ', connection);
    let link = [ '/detail', connection.id ];
    this._router.navigate(link);
  }
}
