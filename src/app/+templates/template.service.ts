import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { ITemplate } from './template.model';
import { ITemplateService } from './template.service.interface';
import { Logger } from '../common/service/log';

let log = Logger.get('TemplateService');

@Injectable()
export class TemplateService implements ITemplateService {

  errorMessage: string;
  private baseUrl: string;

  /**
   * Constructor.
   * @param _http - HTTP
   * @param _appState -- AppState
   */
  constructor(private _http: Http, private _appState: AppState) {
    this.baseUrl = _appState.state.apiEndpoint;
  }


  /**
   * Creates a Template using data provided by the user.
   * @param template - Template
   * @return {Observable<Template>} - Returns an Observable.
   */
  create(template: ITemplate): Observable<ITemplate> {
    let body = JSON.stringify(template);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.baseUrl + '/integrationtemplates/', body, options).map(this.extractData).catch(this.handleError);
  };


  /**
   * Deletes a Template.
   * @param id - ID of the Template
   * @return {Observable<void>} - Returns an Observable.
   */
  del(id: number): Observable<void> {
    return this._http.delete(this.baseUrl + '/integrationtemplates/' + id)
      .map((response: Response) => <ITemplate[]>response.json())
      .do(data => log.debug('Response: ' + JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Gets a single Template by its name.
   * @param id - ID of the Template
   * @return {Observable<Template>} - Returns an Observable.
   */
  get(id: number): Observable<ITemplate> {
    return this._http.get(this.baseUrl + '/integrationtemplates/' + id)
      .map((response: Response) => <ITemplate> response.json())
      .do(function(data) {
        log.debug('Response: ' + JSON.stringify(data));

        if (data.configuredProperties) {
          log.debug('configuredProperties: ' + JSON.stringify(JSON.parse(data.configuredProperties)));
        }
      })
      .catch(this.handleError);
  };


  /**
   * Retrieves a list of all Templates.
   * @return {Observable<Template[]>} - Returns an Observable.
   */
  getAll(): Observable<ITemplate[]> {
    return this._http.get(this.baseUrl + '/integrationtemplates')
      .map((response: Response) => <ITemplate[]>response.json())
      //.do(data => log.debug('All: ' + JSON.stringify(data)))
      .do(function(data) {
        //log.debug('All: ' + JSON.stringify(data));
      })
      .catch(this.handleError);
  }


  /**
   * Gets an Observable of recently updated Templates.
   * @return {Observable<Template[]>} - Returns an Observable.
   */
  getRecent(): Observable<ITemplate[]> {
    return this._http.get(this.baseUrl + '/integrationtemplates')
      .map((response: Response) => <ITemplate[]>response.json())
      .do(data => log.debug('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Updates a single Template.
   * @return {Observable<Template>} - Returns an Observable.
   */
  update(template: ITemplate): Observable<ITemplate> {
    let body = JSON.stringify(template);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.put(this.baseUrl + '/integrationtemplates/' + template.id, body, options).map(this.extractData).catch(this.handleError);
  };


  private extractData(res: Response) {
    log.debug('Response: ' + JSON.stringify(res));

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

