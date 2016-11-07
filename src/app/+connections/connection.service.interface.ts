//import {OpaqueToken} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Connection} from './connection.model';
//import {User} from '../+user/user.model'; // Setup for Auth

export interface IConnectionService {
    /**
     * Creates a new Connection with the given information. This will store the Connection in whatever
     * storage is used by this service. It will return a Promise that the caller can
     * use to be notified when the Connection has been successfully stored.
     * @param connection
     * @return Observable<Connection>
     */
    create(connection: Connection): Observable<Connection>;
    
    /**
     * Called to delete a Connection.  This is done asynchronously and thus returns a promise.
     * @param name
     */
    del(name: string): Promise<void>;
    
    /**
     * Gets a single Connection by its name.
     * @param name of the Connection.
     */
    get(name: string): Promise<Connection>;
    
    /**
     * Gets an observable over all of the Connections. The list of Connections is not guaranteed
     * to be in any particular order. The resulting observer can be used to watch for
     * changes to the list of Connections.
     */
    getAll(): Observable<Connection[]>;
    
    /**
     * Gets an observable over the recently updated Connections. Callers can then subscribe to this
     * observable to be notified when the value changes.
     *
     * @return Observable<Connection[]>
     */
    getRecent(): Observable<Connection[]>;
    
    /**
     * Gets an array of the Connection types supported by this service.
     *
     * @return string[]
     */
    getSupportedConnectionTypes(): string[];
    
    /**
     * Updates an existing Connection with the associated name. It will return a Promise that the
     * caller can use to be notified when the Connection has been successfully stored.
     * @param connection
     * @return Promise<Connection>
     */
    update(connection: Connection): Promise<Connection>;
}

// Setup for Auth
//export const IConnectionService = new OpaqueToken('IConnectionService');
