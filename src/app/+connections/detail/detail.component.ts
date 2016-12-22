import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IConnection } from '../connection.model';
import { ConnectionService } from '../connection.service';

import { Logger } from '../../common/service/log';

let log = Logger.get('+connections/detail');

@Component({
  selector: 'connections-detail',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ 'detail.scss' ],
  templateUrl: 'detail.html',
  providers: [ ConnectionService ]
})
export class Detail implements OnInit, OnDestroy {

  @Input() connection: IConnection;
  @Output() close = new EventEmitter();

  error: any;

  private sub: Subscription;

  /**
   * Constructor.
   * @param _connectionService - ConnectionService
   * @param _route - ActivatedRoute
   * @param _router - Router
   */
  constructor(private _connectionService: ConnectionService,
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit(): void {
    log.debug('hello `Connections: Detail` component');

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

  goBack(): void {
    this._router.navigate(['/connections']);
  }


  gotoEdit(connection: IConnection, $event: any): void {
    //log.debug('$event: ', $event);

    let className = _.get($event, 'target.className');

    if ($event && $event.target && $event.target.className.indexOf('dropdown-toggle') !== -1) {
      return;
    }

    log.debug('Connection: ', connection);

    let link = [ 'connections', 'edit', connection.id ];

    this._router.navigate(link);
  }

  save(): void {
    this._connectionService.update(this.connection);
  }
}
