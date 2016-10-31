import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as URI from 'urijs';

import { AppState } from './../../app.service';
import { OAuth } from './../../oauth.service';
import { Logger } from './log';
import { AppHelpers } from './../helpers/app';

import { KindTypes, CollectionTypes, KubernetesAPI } from './../helpers/kubernetes';

var log = Logger.get('Kubernetes');

/*
 * TODO probably just need 'BaseOptions' and forget the rest of these
 *
 * BaseOptions contain common arguments that can map to URL parameters
 */
export interface BaseOptions {
  // URL parameters
  pretty?: string;
  labelSelector?: string;
  fieldSelector?: string;
  resourceVersion?: string;
  timeoutSeconds?: number;
  // for anything extra we don't know about
  [name:string]: any;
}

/*
 * Options specific for fetching objects from the API server
 */
export interface GetOptions extends BaseOptions {
  kind: string;
  namespace?: string;
  name?: string;
}

/*
 * Options specific for creating an object on the API server
 */
export interface PostOptions extends BaseOptions {
  kind?: string;
  namespace?: string;
  name?: string;
  obj:any;
}

/*
 * Options specific for replacing an object on the API server
 */
export interface PutOptions extends PostOptions {

}

/*
 * Options specific for partially updating an object on the API server
 */
export interface PatchOptions extends PostOptions {

}

/*
 * Options specific for deleting an object from the API server
 */
export interface DelOptions extends BaseOptions {
  kind: string;
  namespace?: string;
  name?: string;
  obj?:any;
}

export interface WatchOptions extends BaseOptions {

}

@Injectable()
export class Kubernetes {

  private url:string = undefined;
  private baseUri:uri.URI = undefined;
  private wsUri:uri.URI = undefined;
  private log = undefined;

  constructor(private http: Http, private appState: AppState, private oauth:OAuth) {
    var url = appState.get('urls.KUBERNETES_MASTER');
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
    if (appState.get('k8sProvider') === 'kubernetes') {
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

  private processOptionsObject(options:any) {
    let data = _.isString(options.obj) ? options.obj : JSON.stringify(options.obj);
		// figure out the right URL based on what we've gotten
    let kind = KubernetesAPI.toKindName(options.kind || _.get(options, 'obj.kind'));
		let namespace = options.namespace || <string>_.get(options, 'obj.metadata.namespace');
		let name = options.name || <string>_.get(options, 'obj.metadata.name');
    let url = KubernetesAPI.applyQueryParameters(KubernetesAPI.url(this.masterUrl, kind, namespace, name), options);
		// create our request options object
    let requestOptions = this.oauth.addCredentials(AppHelpers.getStandardRequestOptions('application/json'));
		if (data) {
			requestOptions.body = data;
		}
		requestOptions.url = url.toString();
    return {
      kind: kind,
      requestOptions: requestOptions
    };
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

  private doMethod(method:string, options:any) {
    let args = this.processOptionsObject(options);
		args.requestOptions.method = method;
    log.debug(method, " ", args.kind, " using options: ", args.requestOptions);
    return this.http.request(new Request(args.requestOptions))
                    .map((res:Response) => {
                      var json = res.json();
                      log.debug(method, "returned object: ", json);
                      var data = <any> _.get(json, 'items') || json;
                      if (_.isArray(data)) {
                        // responses for multiple data return a <resource name>List, we'll set the kind on each item
                        _.forEach(data, (item:any) => {
                          item.apiVersion = json.apiVersion;
                          item.kind = KubernetesAPI.toKindName(args.kind);
                        });
                      }
                      return data;
                    })
                    .catch((error) => {
                      log.error("Error fetching ", args.kind, " : ", error)
                      return error;
                    });

  }

  /*
   * Watch a collection on the server
   */
  watch(options:WatchOptions):Observable<any> {
    // TODO
		throw "Watch not implemented yet";
  }

  /*
   * Delete an object from the server
   */
  del(options:DelOptions):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.doMethod('delete', options);
    }, []);
  }

  /*
   * Create an object on the server
   */
  post(options:PostOptions):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.doMethod('post', options);
    }, []);
  }

  /*
   * Replace an object on the server
   */
  put(options:PutOptions):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.doMethod('put', options);
    }, []);
  }

  /*
   * Partially update an object on the server
   */
  patch(options:PutOptions):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.doMethod('patch', options);
    }, []);
  }

  /*
   * Get an object or collection from the server
   */
  get(options:GetOptions):Observable<any> {
    return AppHelpers.maybeInvoke(this.url, () => {
      return this.doMethod('get', options);
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
