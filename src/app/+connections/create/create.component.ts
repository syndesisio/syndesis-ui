import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';

let log = Logger.get('+connections/create');

@Component({
  moduleId: module.id,
  selector: 'connections-create',
  styles: [ require('./create.scss') ],
  templateUrl: './create.html',
  providers: [ ConnectionService ]
})
export class Create implements OnInit {
  limit = 60;
  trail = '..';

  currentStep = 1;
  listFilter: string;
  errorMessage: string;

  connections: IConnection[];
  connection: IConnection;

  constructor(private _connectionService: ConnectionService,
              private router: Router) {
    this.getConnections();
  }

  ngOnInit() {
    log.debug('hello `Connections: Create` component');

    this._connectionService.getAll()
      .subscribe(connections => this.connections = connections,
        error => this.errorMessage = <any>error);
  }


  getConnections() {
    this._connectionService.getAll();

    console.log('Connections: ' + JSON.stringify(this.connection));
  }

  goToStep1() {
    this.currentStep = 1;
  }

  goToStep2() {
    this.currentStep = 2;
  }

  goToStep3() {
    this.currentStep = 3;
  }

  submit() {
    this.currentStep = 4;

    this._connectionService.create(this.connection);
  }

}
