import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';

let log = Logger.get('+connections/detail');

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

  private sub: Subscription;

  /**
   * Constructor.
   * @param _connectionService - ConnectionService
   * @param _route - ActivatedRoute
   */
  constructor(private _connectionService: ConnectionService,
              private _route: ActivatedRoute) {}

  ngOnInit(): void {
    log.debug('hello `Connections: Detail` component');

    this.sub = this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this.getConnection(id);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getConnection(id: number) {
    this._connectionService.get(id).subscribe(
      connection => this.connection = connection,
      error => this.error = <any>error);
  }

  goBack(savedConnection: IConnection = null): void {
    this.close.emit(savedConnection);
    if (this.navigated) { window.history.back(); }
  }

  save(): void {
    this._connectionService.update(this.connection);
  }
}
