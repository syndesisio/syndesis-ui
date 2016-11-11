//import { OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IConnection } from './connection.model';
//import { IUser } from '../+user/user.model'; // Setup for Auth

export interface IConnectionService {
    /**
     * Creates a new Connection with the given information. This will store the Connection in whatever
     * storage is used by this service. It will return a Promise that the caller can
     * use to be notified when the Connection has been successfully stored.
     * @param connection - Instance of a Connection
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    create(connection: IConnection): Promise<IConnection>;

    /**
     * Called to delete a Connection.  This is done asynchronously and thus returns a promise.
     * @param name - Name of the Connection.
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    del(name: string): Promise<void>;

    /**
     * Gets a single Connection by its name.
     * @param name - Name of the Connection.
     * @return Observable<IConnection> - Returns an Observable.
     */
    get(name: string): Observable<IConnection>;

    /**
     * Gets an observable over all of the Connections. The list of Connections is not guaranteed
     * to be in any particular order. The resulting observer can be used to watch for
     * changes to the list of Connections.
     * @return Observable<Connection[]> - Returns an Observable.
     */
    getAll(): Observable<IConnection[]>;

    /**
     * Gets an observable over the recently updated Connections. Callers can then subscribe to this
     * observable to be notified when the value changes.
     *
     * @return Observable<Connection[]> - Returns an Observable.
     */
    getRecent(): Observable<IConnection[]>;

    /**
     * Gets an array of the Connection types supported by this service.
     *
     * @return string[]
     */
    getSupportedConnectionTypes(): string[];

    /**
     * Updates an existing Connection with the associated name. It will return a Promise that the
     * caller can use to be notified when the Connection has been successfully stored.
     * @param connection - Instance of a Connection.
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    update(connection: IConnection): Promise<IConnection>;
}
