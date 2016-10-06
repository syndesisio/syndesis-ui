import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as URI from 'urijs';

import { AppState } from './app.service';
import { Logger } from './log.service';
import { AppHelpers } from './app.helpers';

var log = Logger.get('Kubernetes');

@Injectable()
export class Kubernetes {

  private url:string = undefined;
  private baseUri:uri.URI = undefined;
  private log = undefined;

  constructor(private http: Http, private appState: AppState) {
    this.url = appState.config.urls['KUBERNETES_MASTER'];
    this.baseUri = new URI(this.url);
    log.debug("Kubernetes service using URL: ", this.baseUri.toString());
  }

  watch(kind:string, namespace?:string):Observable<any> {
    // TODO
    return null;
  }

  del(kind:string, namespace?:string, id?:string):Observable<any> {
    // TODO
    return null;
  }

  put(kind:string, namespace?:string, id?:string):Observable<any> {
    // TODO
    return null;
  }

  get(kind:string, namespace?:string, id?:string):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      // TODO
      return this.http.get(this.url + '/api/v1/namespaces')
                      .map((res:Response) => {

                      })
                      .catch((error) => {
                        log.error("Error fetching namespaces: ", error)
                        return error;
                      });

    }, []);
  }

  getVersion():Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.http.get(this.url + '/version')
                  .map((res:Response) => {
                    var array = res.json();
                    // TODO, filter and sort the command list
                    return array;
                  })
                  .catch((error) => {
                    log.error("Error fetching version: ", error)
                    return error;
                  });
    });
  }

}
