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
    private connectionsUrl = 'app/+connections/connection.data.json'; // URL to JSON file


    /**
     * Constructor.
     * @param http - HTTP
     */
    constructor(private http: Http) {}


    /**
     * Creates a Connection using data provided by the user.
     * @param connection - Connection
     * @return {Promise<Connection>} - Returns a Promise. Should perhaps return an Observable instead.
     */
    create(connection: IConnection): Promise<IConnection> {
        return;
    };


    /**
     * Deletes a Connection. This does not delete the Connection persistently. It removes
     * the Connection from the list of Connections in this session, for now.
     * @param name - Name of the Connection
     * @return {Promise<void>} - Returns a Promise. Should perhaps return an Observable instead.
     */
    del(name: string): Promise<void> {
        return;
    };


    /**
     * Gets a single Connection by its name.
     * This should actually be by ID instead, and needs to be updated.
     * @param name - Name of the Connection
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    get(name: string): Observable<IConnection> {
        return this.getAll()
          .map((connections: IConnection[]) => connections.find(p => p.name === name));
    };


    /**
     * Retrieves a list of all Connections.
     * @return {Observable<Connection[]>} - Returns an Observable.
     */
    getAll(): Observable<IConnection[]> {
        return this.http.get(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
    };


    /**
     * Gets an Observable of recently updated Connections.
     * @return {Observable<Connection[]>} - Returns an Observable.
     */
    getRecent(): Observable<IConnection[]> {
        return;
    };


    /**
     * Gets the supported Connections types for this implementation.
     * Returns a Promise. Should perhaps return an Observable instead.
     * @return {string[]}
     */
    getSupportedConnectionTypes(): string[] {
        return [
            'Integration'
        ];
    };


    /**
     * Updates a single Connection.
     * Returns a Promise. Should perhaps return an Observable instead.
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    update(connection: IConnection): Promise<IConnection> {
        return;
    };


    private extractData(res: Response) {
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

