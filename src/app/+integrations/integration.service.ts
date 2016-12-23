import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../app.service';
import { IIntegration } from './integration.model';
import { IIntegrationService } from './integration.service.interface';
import { Logger } from '../common/service/log';

import { TemplateService } from '../+templates/template.service';

let log = Logger.get('IntegrationService');

@Injectable()
export class IntegrationService implements IIntegrationService {

  errorMessage: string;
  private baseUrl: string;

  /**
   * Constructor.
   * @param _http - HTTP
   * @param _appState - AppState
   * @param _templateService - TemplateService
   */
  constructor(private _http: Http,
              private _appState: AppState,
              private _templateService: TemplateService) {
    this.baseUrl = _appState.state.apiEndpoint;
  }


  /**
   * Creates a Integration using data provided by the user.
   * @param integration - Integration
   * @return {Observable<IIntegration>} - Returns an Observable.
   */
  create(integration: IIntegration): Observable<IIntegration> {
    let body = JSON.stringify(integration);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(this.baseUrl + '/integrations/', body, options).map(this.extractData).catch(this.handleError);
  };


  /**
   * Deletes a Integration.
   * @param id - ID of the Integration
   * @return {Observable<void>} - Returns an Observable.
   */
  del(id: number): Observable<void> {
    return this._http.delete(this.baseUrl + '/integrations/' + id)
      .map((response: Response) => <IIntegration[]>response.json())
      .do(data => log.debug('Response: ' + JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Gets a single Integration by its name.
   * @param id - ID of the Integration
   * @return {Observable<IIntegration>} - Returns an Observable.
   */
  get(id: number): Observable<IIntegration> {
    return this._http.get(this.baseUrl + '/integrations/' + id)
      .map((response: Response) => <IIntegration> response.json())
      .do(function (data) {
        log.debug('Response: ' + JSON.stringify(data));

        if (data.configuredProperties) {
          log.debug('configuredProperties: ' + JSON.stringify(JSON.parse(data.configuredProperties)));
        }
      })
      .catch(this.handleError);
  };


  /**
   * Retrieves a list of all Integrations.
   * @return {Observable<IIntegration[]>} - Returns an Observable.
   */
  getAll(): Observable<IIntegration[]> {
    return this._http.get(this.baseUrl + '/integrations')
      .map((response: Response) => <IIntegration[]>response.json())
      //.do(data => log.debug('All: ' + JSON.stringify(data)))
      .do(function (data) {
        log.debug('All: ' + JSON.stringify(data));
        // Fetch all Integration Templates
        /*
        this._templateService.getAll(function(hello) {
          console.log('_templateService.getAll() hello: ' + JSON.stringify(hello));
        });
        //for(var i = 0; i < data.length; i++) {
          //if(data[i].id === ) {}
        //}
        */
      })
      .catch(this.handleError);
  }


  /**
   * Gets an Observable of recently updated Integrations.
   * @return {Observable<IIntegration[]>} - Returns an Observable.
   */
  getRecent(): Observable<IIntegration[]> {
    return this._http.get(this.baseUrl + '/integrations')
      .map((response: Response) => <IIntegration[]>response.json())
      .do(data => log.debug('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  };


  /**
   * Updates a single Integration.
   * @return {Observable<IIntegration>} - Returns an Observable.
   */
  update(integration: IIntegration): Observable<IIntegration> {
    let body = JSON.stringify(integration);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.put(this.baseUrl + '/integrations/' + integration.id, body, options).map(this.extractData).catch(this.handleError);
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

