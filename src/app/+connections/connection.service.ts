import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

// Here were are mostly using observables instead of promises
import { Observable } from 'rxjs/Observable';

//import * as _ from 'lodash';

import { IConnection } from './connection.model';
import { IConnectionService } from './connection.service.interface';

import { Logger } from '../common/service/log';

let log = Logger.get('ConnectionService');

@Injectable()
export class ConnectionService implements IConnectionService {

  errorMessage: string;
  private allConnections: IConnection[];

  //baseUrl: string;
  //private connectionsUrl = 'app/+connections/connection.data.json'; // URL to JSON file
  //private connectionsUrl = 'http://localhost:9090';
  private baseUrl = 'http://localhost:9090/v1';


  /**
   * Constructor.
   * @param _http - HTTP
   */
  constructor(private _http: Http) {}


  /**
   * Creates a Connection using data provided by the user.
   * @param connection - Connection
   * @return {Observable<Connection>} - Returns an Observable.
   */
  create(connection: IConnection): Observable<IConnection> {
    let body = JSON.stringify(connection);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.baseUrl, body, options).map(this.extractData).catch(this.handleError);
  };


  /**
   * Deletes a Connection.
   * @param id - ID of the Connection
   * @return {Observable<void>} - Returns an Observable.
   */
  del(id: number): Observable<void> {
    return this._http.delete(this.baseUrl + '/connections/' + id)
      .map((response: Response) => <IConnection[]> response.json())
      .do(data => console.log('Response: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Gets a single Connection by its name.
   * This should actually be by ID instead, and needs to be updated.
   * @param id - ID of the Connection
   * @return {Observable<Connection[]>} - Returns an Observable.
   */
  get(id: number): Observable<IConnection> {
    return this.getAll().map((connections: IConnection[]) => connections.find(c => c.id === id));
  };


  /**
   * Retrieves a list of all Connections.
   * @return {Observable<Connection[]>} - Returns an Observable.
   */
  getAll(): Observable<IConnection[]> {
    return this._http.get(this.baseUrl + '/connections')
      .map((response: Response) => <IConnection[]> response.json())
      .do(data => console.log('All: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  }


  /**
   * Gets an Observable of recently updated Connections.
   * @return {Observable<Connection[]>} - Returns an Observable.
   */
  getRecent(): Observable<IConnection[]> {
    return this._http.get(this.baseUrl + '/connections')
      .map((response: Response) => <IConnection[]> response.json())
      .do(data => console.log('All: ' +  JSON.stringify(data)))
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

    return this._http.put(this.baseUrl, body, options).map(this.extractData).catch(this.handleError);
  };


  private extractData(res: Response) {
    console.log('Response: ' + JSON.stringify(res));

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

}

