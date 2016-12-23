import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { IConnection } from './connection.model';
import { IConnectionService } from './connection.service.interface';
import { Logger } from '../common/service/log';

let log = Logger.get('ConnectionService');

@Injectable()
export class ConnectionService implements IConnectionService {

  errorMessage: string;
  private baseUrl: string;

  /**
   * Constructor.
   * @param _http - HTTP
   * @param _appState -- AppState
   */
  constructor(private _http: Http, private _appState: AppState) {
    this.baseUrl = _appState.state.apiEndpoint;
  }

  /**
   * Creates a Connection using data provided by the user.
   * @param connection - Connection
   * @return {Observable<Connection>} - Returns an Observable.
   */
  create(connection: IConnection): Observable<IConnection> {
    // Check for required properties
    connection.configuredProperties = (!connection.configuredProperties) ? {} : connection.configuredProperties;
    connection.icon = (!connection.icon) ? 'fa-rocket' : connection.icon;
    connection.description = (!connection.description) ? 'Math.random().toString(36).substring(7);' : connection.description;
    connection.position = (!connection.position) ? Math.random().toString(36).substring(7) : connection.position;
    connection.name = (!connection.name) ? this.randomCharacter() : connection.name;

    // Prepare request
    let body = JSON.stringify(connection);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.baseUrl + '/connections/', body, options).map(this.extractData).catch(this.handleError);
  };


  /**
   * Deletes a Connection.
   * @param id - ID of the Connection
   * @return {Observable<void>} - Returns an Observable.
   */
  del(id: number): Observable<void> {
    return this._http.delete(this.baseUrl + '/connections/' + id)
      .map((response: Response) => <IConnection[]>response.json())
      .do(data => log.debug('Response: ' + JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Gets a single Connection by its name.
   * @param id - ID of the Connection
   * @return {Observable<Connection>} - Returns an Observable.
   */
  get(id: number): Observable<IConnection> {
    return this._http.get(this.baseUrl + '/connections/' + id)
      .map((response: Response) => <IConnection> response.json())
      .do(function (data) {
        log.debug('Response: ' + JSON.stringify(data));

        if (data.configuredProperties) {
          log.debug('configuredProperties: ' + JSON.stringify(JSON.parse(data.configuredProperties)));
        }
      })
      .catch(this.handleError);
  };


  /**
   * Retrieves a list of all Connections.
   * @return {Observable<Connection[]>} - Returns an Observable.
   */
  getAll(): Observable<IConnection[]> {
    return this._http.get(this.baseUrl + '/connections')
      .map((response: Response) => <IConnection[]>response.json())
      //.do(data => log.debug('All: ' + JSON.stringify(data)))
      .do(function (data) {
        //log.debug('All: ' + JSON.stringify(data));
      })
      .catch(this.handleError);
  }


  /**
   * Gets an Observable of recently updated Connections.
   * @return {Observable<Connection[]>} - Returns an Observable.
   */
  getRecent(): Observable<IConnection[]> {
    return this._http.get(this.baseUrl + '/connections')
      .map((response: Response) => <IConnection[]>response.json())
      .do(data => log.debug('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Updates a single Connection.
   * @return {Observable<Connection>} - Returns an Observable.
   */
  update(connection: IConnection): Observable<IConnection> {
    let body = JSON.stringify(connection);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.put(this.baseUrl + '/connections/' + connection.id, body, options).map(this.extractData).catch(this.handleError);
  };


  private extractData(res: Response) {
    log.debug('Response: ' + JSON.stringify(res));

    let body = res.json();
    return body.data || {};
  };


  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg); // log to console instead

    return Observable.throw(errMsg);
  };

  private randomCharacter() {
    let chars = 'abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    return chars.substr( Math.floor(Math.random() * 62), 1);
  };

}

