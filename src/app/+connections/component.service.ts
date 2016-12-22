import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { IComponent } from './component.model';
//import { IComponentService } from './component.service.interface';

import { Logger } from '../common/service/log';

let log = Logger.get('ComponentService');

@Injectable()
export class ComponentService {

  private baseUrl: string;
  private error: string;

  /**
   * Constructor.
   * @param _http - HTTP
   * @param _appState -- AppState
   */
  constructor(private _http: Http, private _appState: AppState) {
    this.baseUrl = _appState.state.apiEndpoint;
  }


  /**
   * Creates a Component using data provided by the user.
   * @param component - Component
   * @return {Observable<Component>} - Returns an Observable.
   */
  create(component: IComponent): Observable<IComponent> {
    let body = JSON.stringify(component);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.baseUrl, body, options).map(this.extractData).catch(this.handleError);
  };


  /**
   * Deletes a Component.
   * @param id - ID of the Component
   * @return {Observable<void>} - Returns an Observable.
   */
  del(id: number): Observable<void> {
    return this._http.delete(this.baseUrl + '/components/' + id)
      .map((response: Response) => <IComponent[]> response.json())
      .do(data => console.log('Response: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Gets a single Component by its name.
   * This should actually be by ID instead, and needs to be updated.
   * @param id - ID of the Component
   * @return {Observable<Component>} - Returns an Observable.
   */
  get(id: number): Observable<IComponent> {
    return this._http.get(this.baseUrl + '/components/' + id)
      .map((response: Response) => <IComponent> response.json())
      .do(data => console.log('Response: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Retrieves a list of all Components.
   * @return {Observable<Component[]>} - Returns an Observable.
   */
  getAll(): Observable<IComponent[]> {
    return this._http.get(this.baseUrl + '/components')
      .map((response: Response) => <IComponent[]> response.json())
      //.do(data => console.log('All: ' +  JSON.stringify(data)))
      .do(function(data) {
        //log.debug('All: ' + JSON.stringify(data));
      })
      .catch(this.handleError);
  }


  /**
   * Gets an Observable of recently updated Components.
   * @return {Observable<Component[]>} - Returns an Observable.
   */
  getRecent(): Observable<IComponent[]> {
    return this._http.get(this.baseUrl + '/components')
      .map((response: Response) => <IComponent[]> response.json())
      .do(data => console.log('All: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Updates a single Component.
   * @return {Observable<Component>} - Returns an Observable.
   */
  update(component: IComponent): Observable<IComponent> {
    let body = JSON.stringify(component);
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

