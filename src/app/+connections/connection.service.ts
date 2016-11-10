import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// Here were are mostly using observables instead of promises
import {Observable} from 'rxjs/Observable';

//import * as _ from 'lodash';

import {Forge} from '../common/service/forge';
import {Connection} from './connection.model';
import {IConnectionService} from './connection.service.interface';

import {Logger} from '../common/service/log';

let log = Logger.get('ConnectionService');

const CONNECTIONS_LOCAL_STORAGE_KEY = 'dj3ukAn*wa7,RnY2';

@Injectable()
export class ConnectionService implements IConnectionService {

    private _connections: BehaviorSubject<Connection[]> = new BehaviorSubject([]);
    private _recentConnections: BehaviorSubject<Connection[]> = new BehaviorSubject([]);
    connections: Observable<Connection[]> = this._recentConnections.asObservable();
    errorMessage: string;
    recentConnections: Observable<Connection[]> = this._recentConnections.asObservable();
    
    private allConnections: Connection[];
    
    //private connectionsUrl = './connections.data.json'; // URL to JSON file
    private connectionsUrl = 'app/+connections/connection.data.json'; // URL to JSON file
    //private connectionsUrl = 'app/connections';  // URL to web API
    
    
    /**
     * Constructor.
     * @param http - HTTP
     * @param forge - Forge
     */
    constructor(private http: Http, private forge: Forge) {
        this.allConnections = this.loadConnectionsFromLocalStorage();
        console.info("[LocalConnectionsService] Loaded Connections from localStorage: %o", this.allConnections);
        
        this._connections.next(this.allConnections);
        let ra: Connection[] = this.allConnections.slice(0, 4);
        this._recentConnections.next(ra);
    }
    
    
    /**
     * Creates a Connection using data provided by the user.
     * @param connection - Connection
     * @return {Promise<Connection>} - Returns a Promise. Should perhaps return an Observable instead.
     */
    create(connection: Connection): Promise<Connection> {
        // Push the new Connection onto the list
        this.allConnections.unshift(connection);
        // Save the result in local storage
        this.storeConnectionsInLocalStorage(this.allConnections);
        // Publish some events
        this._connections.next(this.allConnections);
        let ra: Connection[] = this.allConnections.slice(0, 4);
        this._recentConnections.next(ra);
        return Promise.resolve(connection);
    };
    
    
    /**
     * Deletes a Connection. This does not delete the Connection persistently. It removes
     * the Connection from the list of Connections in this session, for now.
     * @param name - Name of the Connection
     * @return {Promise<void>} - Returns a Promise. Should perhaps return an Observable instead.
     */
    del(name: string): Promise<void> {
        return;
        /*
         let idx: number = this.allConnections.indexOf(name);
         if (idx != -1) {
         this.allConnections.splice(idx, 1);
         this._connections.next(this.allConnections);
         let ra: Connection[] = this.allConnections.slice(0, 4);
         this._recentConnections.next(ra);
         
         // Save the result in local storage
         this.storeConnectionsInLocalStorage(this.allConnections);
         }
         return Promise.resolve(null);
         */
    };
    
    
    /**
     * Gets a single Connection by its name.
     * This should actually be by ID instead, and needs to be updated.
     * @param name - Name of the Connection
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    get(name: string): Promise<Connection> {
        let rval: Connection = null;
        let idx: number = 0;
        while (idx < this.allConnections.length) {
            let connection: Connection = this.allConnections[idx];
            if (connection.name === name) {
                rval = connection;
                break;
            }
            idx++;
        }
        if (rval != null && idx > 0) {
            this.allConnections.splice(idx, 1);
            this.allConnections.unshift(rval);
            this._connections.next(this.allConnections);
            let ra: Connection[] = this.allConnections.slice(0, 4);
            this._recentConnections.next(ra);
        }
        return Promise.resolve(rval);
    };
    
    
    /**
     * Retrieves a list of all Connections.
     * @return {Observable<Connection[]>} - Returns an Observable.
     */
    getAll(): Observable<Connection[]> {
         return this.http.get(this.connectionsUrl)
         .map(this.extractData)
         .catch(this.handleError);
        /*
        return this.forge.executeCommand({
            commandId: 'ipaas-search-connectors',
            data: {
                inputList: [{latest: true, filter: ''}]
            }
        }).map((body) => {
            var connections = JSON.parse(body.message);
            if (!connections) {
                // TODO error handling
                return [];
            }
            connections.forEach((connection) => {
                // TODO ideally this would be set by the forge command
                if (!connection.id) {
                    connection.id = connection.groupId + ":" + connection.artifactId + ":" + connection.version;
                }
                // TODO probably could stand to be set by the backend
                if (!connection.icon) {
                    connection.icon = getConnectionIcon(connection);
                }
            });
            log.info("Got connections: ", connections);
            return connections;
        })
          .catch(this.handleError);
          */
    };
    
    
    /**
     * Gets an Observable of recently updated Connections.
     * @return {Observable<Connection[]>} - Returns an Observable.
     */
    getRecent(): Observable<Connection[]> {
        return this.recentConnections;
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
     * Resolves the Connection info by fetching the content of the Connection and extracting
     * the name and description.
     * Returns a Promise. Should perhaps return an Observable instead.
     * @param connection - Connection
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    resolveConnectionInfo(connection: Connection): Promise<Connection> {
        let headers = new Headers({'Accept': 'application/json'});
        let options: any = new RequestOptions({headers: headers});
        
        return this.http.get(options).toPromise().then(response => {
            let data: any = response.json();
            let b64content: string = data.content;
            let content: string = atob(b64content);
            let pc: any = JSON.parse(content);
            
            connection.name = pc.info.title;
            connection.description = pc.info.description;
            return connection;
        });
    };
    
    
    /**
     * Searches for Connections that contain a string, provided by the user, in the name or description?
     * @param query - String to be used for the search.
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    search(query: string): Promise<Connection> {
        let rval: Connection = null;
        // Do stuff here
        
        return Promise.resolve(rval);
    };
    
    
    /**
     * Updates a single Connection.
     * Returns a Promise. Should perhaps return an Observable instead.
     * @return Promise<Connection> - Returns a Promise. Should perhaps return an Observable instead.
     */
    update(connection: Connection): Promise<Connection> {
        // Push the new Connection onto the list
        this.allConnections.unshift(connection);
        
        // Save the result in localStorage
        this.storeConnectionsInLocalStorage(this.allConnections);
        
        // Publish some events
        this._connections.next(this.allConnections);
        let ra: Connection[] = this.allConnections.slice(0, 4);
        this._recentConnections.next(ra);
        
        return Promise.resolve(connection);
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
    
    
    /**
     * Loads the list of Connections known to this service from browser localStorage.
     * @return - The list of Connections loaded from localStorage.
     */
    private loadConnectionsFromLocalStorage(): Connection[] {
        let storedConnections: string = localStorage.getItem(CONNECTIONS_LOCAL_STORAGE_KEY);
        if (storedConnections) {
            return JSON.parse(storedConnections);
        } else {
            return [];
        }
    };
    
    
    private searchProcess(res: Response, term) {
        // The response object doesn't hold the data in a form the app can use directly.
        // You must parse the response data into a JSON object.
        let body = res.json();
        
        console.log('Term: ' + JSON.stringify(term));
        
        console.log('Unfiltered: ' + JSON.stringify(body.data));
        
        console.log('Filtering...');
    };
    
    
    /**
     * Stores the list of Connections in the browser's localStorage.
     * @param connections - The list of Connections to save in localStorage.
     */
    private storeConnectionsInLocalStorage(connections: Connection[]): void {
        let serializedConnections = null;
        
        if (connections) {
            serializedConnections = JSON.stringify(connections);
        } else {
            serializedConnections = JSON.stringify([]);
        }
        
        localStorage.setItem(CONNECTIONS_LOCAL_STORAGE_KEY, serializedConnections);
    };
}

function getConnectionIcon(connection:any) {
    if (connection.icon) {
        return connection.icon;
    }
    var kind = _.last(connection.baseJavaType.split('.'));
    switch (kind) {
        case "LogComponent":
            return "fa-newspaper-o";
        case "TimerComponent":
            return "fa-clock-o";
        default:
            return "fa-puzzle-piece";
    }
}
