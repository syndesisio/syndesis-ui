import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as URI from 'urijs';

import { AppState } from './app.service';
import { Logger } from './log.service';
import { AppHelpers } from './app.helpers';

import { KindTypes, WatchTypes, KubernetesAPI } from './kubernetes.helpers.ts';

var log = Logger.get('Kubernetes');

@Injectable()
export class Kubernetes {

  private url:string = undefined;
  private baseUri:uri.URI = undefined;
  private wsUri:uri.URI = undefined;
  private log = undefined;

  constructor(private http: Http, private appState: AppState) {
    var url = appState.config.urls['KUBERNETES_MASTER'];
    if (_.startsWith(url, '/')) {
      // URL is an absolute path with no host:port, build the full URL from /
      var baseHref = AppHelpers.baseDocumentUri();
      url = baseHref.path(url).toString();
    }
    if (!_.startsWith(url, 'http')) {
      // URL is a relative path with no host:port, build the full URL based on our document location
      var baseHref = AppHelpers.baseDocumentUri();
      url = baseHref.segment(url).toString();
    }
    this.url = url;
    this.baseUri = new URI(this.url);
    this.wsUri = KubernetesAPI.wsUrl(this.url);
    log.info("Kubernetes service using URL: ", this.baseUri.toString(), " WebSocket URL: ", this.wsUri.toString());
  }

  /*
   * Expose the API server URL
   */
  get masterUrl():uri.URI {
    return this.baseUri.clone();
  }

  /*
   * Expose the API server websocket URL
   */
  get masterWsUrl():uri.URI {
    return this.wsUri.clone();
  }

  /*
   * Watch a collection on the server
   */
  watch(kind:string, namespace?:string):Observable<any> {
    // TODO
    return null;
  }

  /*
   * Delete an object from the server
   */
  del(kind:string, namespace?:string, id?:string):Observable<any> {
    // TODO
    return null;
  }

  /*
   * Add/replace an object on the server
   */
  put(kind:string, namespace?:string, id?:string):Observable<any> {
    // TODO
    return null;
  }

  /*
   * Get an object or collection from the server
   */
  get(kind:string, namespace?:string, id?:string):Observable<any> {
    if (KubernetesAPI.namespaced(kind) && !namespace) {
      return null;
    }
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

  /*
   * Get the kubernetes version object
   */
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
