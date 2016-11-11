import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';

var log = Logger.get('+connections/create');

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

  listFilter: string;
  errorMessage: string;
  newConnection: any;

  @Input() connections: IConnection[];

  constructor(private _connectionService: ConnectionService,
              private router: Router) {
    this.getConnections();
  }

  ngOnInit() {
    log.debug('hello `Connections: Create` component');
  }


  getConnections() {
    this._connectionService.getAll()
      .subscribe(
        connections => this.connections = connections,
        error => this.errorMessage = <any>error);
  }

  goToStep1() {}

  goToStep2() {}

  goToStep3() {}
  
  submit() {}

}
