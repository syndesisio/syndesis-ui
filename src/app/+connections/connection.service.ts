// Here were are using observables, not promises
//import {Observable} from 'rxjs/Observable';
//import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import { Forge } from '../common/service/forge';
import {Connection} from './connection.model';
import {IConnectionService} from './connection.service.interface';

export class ConnectionService implements IConnectionService {
    
    //private connectionsUrl = './connections.data.json'; // URL to JSON file
    private connectionsUrl = 'app/+connections/connections.data.json'; // URL to JSON file
    //private connectionsUrl = 'app/connections';  // URL to web API
    errorMessage: string;
    
    constructor(private http: Http, private forge: Forge) {}
    
    create(connection: Connection): Observable<Connection> {
        let body = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.post(this.connectionsUrl, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
    /**
     * Deletes a Connection. This does not delete the Connection persistently. It removes
     * the Connection from the list of Connections in this session, for now.
     * @param connection
     * @return {Promise<void>}
     */
    del(connection: Connection): Promise<void> {
        let idx: number = this.allConnections.indexOf(connection);
        if (idx != -1) {
            this.allConnections.splice(idx, 1);
            this._connections.next(this.allConnections);
            let ra: Connection[] = this.allConnections.slice(0, 4);
            this._recentConnections.next(ra);
            
            // Save the result in local storage
            this.storeConnectionsInLocalStorage(this.allConnections);
        }
        return Promise.resolve(null);
    }
    
    get(name: string): Observable<Connection[]> {
        return this.http.get(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
    getAll(): Observable<Connection[]> {
			/*
        return this.http.get(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
					*/
				return this.forge.executeCommand({
					commandId: 'ipaas-search-connectors',
					data: {
						inputList: [{ latest: true, filter: '' }]
					}
				}).map((body) => {
					return JSON.parse(body.message);
				})
				  .catch(this.handleError);
    };
    
    getSupportedConnectionTypes(query): string {
        return query;
    }
    
    update(name: string): Observable<Connection> {
        let body = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.put(this.connectionsUrl, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    
    private searchProcess(res: Response, term) {
        // The response object doesn't hold the data in a form the app can use directly.
        // You must parse the response data into a JSON object.
        let body = res.json();
    
        console.log('Term: ' + JSON.stringify(term));
    
        console.log('Unfiltered: ' + JSON.stringify(body.data));
        
        console.log('Filtering...');
        
        //let filtered = _.filter(body.data, {'name': term} || {  });
        
        //console.log('Filtered: ' + JSON.stringify(filtered));
        
        //return filtered;
        
        //return body.data || { };
    }
    
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg); // log to console instead
        
        return Observable.throw(errMsg);
    }
    
    /**
     * Resolves the Connection info by fetching the content of the Connection and extracting
     * the name and description.
     * @param connection
     */
    public resolveConnectionInfo(connection: Connection): Promise<Connection> {
        let headers = new Headers({ 'Accept': 'application/json' });
        let options: any = new RequestOptions({ headers: headers });
        
        return this.http.get(options).toPromise().then( response => {
            let data: any = response.json();
            let b64content: string  = data.content;
            let content: string = atob(b64content);
            let pc: any = JSON.parse(content);
            
            connection.name = pc.info.title;
            connection.description = pc.info.description;
            return connection;
        });
    }
}


