import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';

let log = Logger.get('+connections/edit');

@Component({
  selector: 'connections-edit',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ 'edit.scss' ],
  templateUrl: 'edit.html',
  providers: [ ConnectionService ]
})
export class Edit implements OnInit {
  currentStep = 1;
  limit = 60;
  listFilter: string;
  error: any;
  trail = '..';

  private sub: Subscription;

  @Input() connection: IConnection;
  @Output() close = new EventEmitter();

  /**
   * Constructor.
   * @param _connectionService - ConnectionService
   * @param _route - ActivatedRoute
   * @param _router - Router
   */
  constructor(private _connectionService: ConnectionService,
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit() {
    log.debug('hello `Connections: Edit` component');

    this.sub = this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getConnection(id);
      });

    log.debug('Connection: ' + JSON.stringify(this.connection));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getConnection(id: number) {
    this._connectionService.get(id).subscribe(
      connection => this.connection = connection,
      error => this.error = <any>error);
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
