import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';

var log = Logger.get('+connections/edit');

@Component({
  selector: 'connections-edit',
  styles: [ require('./edit.scss') ],
  templateUrl: './edit.html',
  providers: [ ConnectionService ]
})
export class Edit implements OnInit {
  limit = 60;
  trail = '..';

  currentStep = 1;
  listFilter: string;
  errorMessage: string;

  @Input() connections: IConnection[];

  constructor(private _connectionService: ConnectionService,
              private router: Router) {
    this.getConnections();
  }

  ngOnInit() {
    log.debug('hello `Connections: Edit` component');
  }


  getConnections() {
    this._connectionService.getAll()
      .subscribe(
        connections => this.connections = connections,
        error => this.errorMessage = <any>error);
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
  }

}
