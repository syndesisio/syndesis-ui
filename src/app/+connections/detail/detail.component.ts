import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  @Input() connection: IConnection;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  /**
   * Constructor.
   * @param _connectionService - ConnectionService
   * @param route - ActivatedRoute
   */
  constructor(private _connectionService: ConnectionService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    log.debug('hello `Connections: Detail` component');

    this.route.params.forEach((params: Params) => {
      if (params[ 'name' ] !== undefined) {
        let name = +params[ 'name' ];
        this.navigated = true;
        this._connectionService.get(name.toString())
          .subscribe(
            connections => this.connection = connections,
            error => this.error = <any>error);
      } else {
        this.navigated = false;
        this.connection = new IConnection();
      }
    });
  }

  save(): void {
    this._connectionService
      .update(this.connection)
      .then(connection => {
        this.connection = connection; // saved connection, w/ id if new
        this.goBack(connection);
      })
      .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedConnection: IConnection = null): void {
    this.close.emit(savedConnection);
    if (this.navigated) { window.history.back(); }
  }

}
