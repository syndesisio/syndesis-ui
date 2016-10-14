import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as URI from 'urijs';

import { AppState } from './../../app.service';
import { Logger } from './log';
import { AppHelpers } from './../helpers/app';

import { KindTypes, CollectionTypes, KubernetesAPI } from './../helpers/kubernetes';

var log = Logger.get('Kubernetes');

export interface GetOptions {
  kind: string;
  namespace?: string;
  name?: string;
  // URL parameters
  labelSelector?: string;
  fieldSelector?: string;
  resourceVersion?: string;
  pretty?: string;
  timeoutSeconds?: number;
  // for anything extra we don't know about
  [name:string]: any;
}

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
    // configure path overrides based on the environment we're running against
    if (_.get(appState, 'config.k8sProvider') === 'kubernetes') {
      // set a path override for buildconfigs and make sure that works
      KubernetesAPI.setPathOverride(KindTypes.BUILD_CONFIGS, (apiServerUri:uri.URI, kind:string, namespace?:string, name?:string):uri.URI => {
        kind = KubernetesAPI.toCollectionName(kind);
        // TODO the namespace in this path needs to be configurable
        var answer = apiServerUri.segment('/api/v1/proxy/namespaces/default/services/jenkinshift:80/').segment(KubernetesAPI.prefixForKind(kind));
        if (namespace) {
          answer.segment('namespaces').segment(namespace);
        }
        answer.segment(kind);
        if (name) {
          answer.segment(name);
        }
        console.warn("Using override: ", answer.toString());
        return answer;
      });
    }
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
  get(options:GetOptions):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      var kind = KubernetesAPI.toKindName(options.kind);
      var url = KubernetesAPI.url(this.masterUrl, kind, options.namespace, options.name);
      url = KubernetesAPI.applyQueryParameters(url, options);
      log.debug("get ", kind, " using path: ", url);
      return this.http.get(url.toString())
                      .map((res:Response) => {
                        var json = res.json();
                        log.debug("get returned object: ", json);
                        var data = <any> _.get(json, 'items') || json;
                        if (_.isArray(data)) {
                          // responses for multiple data return a <resource name>List, we'll set the kind on each item
                          _.forEach(data, (item:any) => {
                            item.apiVersion = json.apiVersion;
                            item.kind = KubernetesAPI.toKindName(kind);
                          });
                        }
                        return data;
                      })
                      .catch((error) => {
                        log.error("Error fetching ", kind, " : ", error)
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
                  .map((res:Response) => res.json())
                  .catch((error) => {
                    log.error("Error fetching version: ", error)
                    return error;
                  });
    });
  }

}
