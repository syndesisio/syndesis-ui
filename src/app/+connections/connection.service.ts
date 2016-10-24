// Here were are using observables, not promises

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';

import {Connection} from './connection.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConnectionService {
    
    //private connectionsUrl = './connections.data.json'; // URL to JSON file
    private connectionsUrl = 'app/+connections/connections.data.json'; // URL to JSON file
    //private connectionsUrl = 'app/connections';  // URL to web API
    
    constructor(private http: Http) {}
    
    addConnection(name: string): Observable<Connection> {
        let body = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.post(this.connectionsUrl, body, options)
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    getConnections(): Observable<Connection[]> {
        return this.http.get(this.connectionsUrl)
          .map(this.extractData)
          .catch(this.handleError);
    }
    
    searchConnections(term: string): Observable<Connection[]> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        
        return this.http.get(this.connectionsUrl)
          .map((r: Response) => r.json().data as Connection[]);
    };
    
    updateConnection(name: string): Observable<Connection> {
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
    
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
        console.error(errMsg); // log to console instead
        
        return Observable.throw(errMsg);
    }
}


