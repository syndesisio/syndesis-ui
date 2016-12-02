//import { OpaqueToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IConnection } from './connection.model';
//import { IUser } from '../+user/user.model'; // Setup for Auth

export interface IConnectionService {
    /**
     * Creates a new Connection with the given information.
     * @param connection - Instance of a Connection
     * @return Observable<Connection> - Returns an Observable.
     */
    create(connection: IConnection): Observable<IConnection>;

    /**
     * Called to delete a Connection.
     * @param id - ID of the Connection.
     * @return Observable<void> - Returns an Observable.
     */
    del(id: number): Observable<void>;

    /**
     * Gets a single Connection by its name.
     * @param id - ID of the Connection.
     * @return Observable<IConnection> - Returns an Observable.
     */
    get(id: number): Observable<IConnection>;

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
     * @return Observable<IConnection[]> - Returns an Observable.
     */
    getRecent(): Observable<IConnection[]>;

    /**
     * Updates an existing Connection with the associated name. It will return a Promise that the
     * caller can use to be notified when the Connection has been successfully stored.
     * @param connection - Instance of a Connection.
     * @return Observable<IConnection> - Returns an Observable.
     */
    update(connection: IConnection): Observable<IConnection>;
}
