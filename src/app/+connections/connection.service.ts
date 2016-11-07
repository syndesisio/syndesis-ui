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
    
    constructor(private http: Http, private forge: Forge) {}
    
    create(name: string): Observable<Connection> {
        let body = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.post(this.connectionsUrl, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
    del(name: string): Observable<Connection> {
        let id = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        
        return this.http.delete(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
    };
    
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
}


