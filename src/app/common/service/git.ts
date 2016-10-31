import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as URI from 'urijs';
import * as _ from 'lodash';

import { AppState } from './../../app.service';
import { OAuth } from './../../oauth.service';
import { Logger } from './log';
import { AppHelpers } from './../helpers/app';

var log = Logger.get('Git');

/*
 * Interface for options used to call the git service methods
 */
export interface GitOptions {
  teamId:string;
  projectId:string;
  branch?:string;
  path?:string;
  data?:any;
}

/*
 * An angular service that providers operations for
 * working with git repositories
 */
@Injectable()
export class Git {

  private urlString:string = undefined;
  private url:uri.URI = undefined;

  constructor(private http: Http, private appState: AppState, private oauth: OAuth) {
    var urlString = this.urlString = appState.get('urls.FABRIC8_FORGE');
    this.url = new URI(urlString).segment('repos/project');
    log.debug("using URL: ", this.url.toString());

    // TODO setting these here for now, these should 
    // be configured in the UI
    appState.set('sourceSecret', 'default-gogs-git');
    appState.set('secretNamespace', 'user-secrets-source-admin');
    appState.set('kubeUserName', 'admin');
    // TODO just to remember these could be required
    appState.set('_gogsAuth', undefined);
    appState.set('_gogsEmail', undefined);
    // TODO also 'gitUrl' might be needed
  }

  private createUrl(action:string, options:GitOptions) {
    let queryParams = ['secret', 'secretNamespace', 'kubeUserName'];
    var search = {};
    _.forEach(queryParams, (param) => {
      if (this.appState.get(param)) {
        search[param] = this.appState.get(param);
      }
    });
    var url = this.url.clone().segment(options.teamId).segment(options.projectId).segment(action).search(search);
    if (options.path) {
      url = url.segment(options.path);
    }
    return url;
  }
  
  private doMethod(action:string, method:string, options:GitOptions, customizer?: (data:any) => any) {
    let data = options.data ? JSON.stringify(options.data, undefined, 2) : undefined;
    let requestOptions = this.oauth.addCredentials(AppHelpers.getStandardRequestOptions('application/json'));
    let url = this.createUrl(action, options);
    log.debug("url for action: ", action, " using method: ", method, ":", url.toString());
		requestOptions.url = url.toString();
		requestOptions.method = method;
		if (data) {
			requestOptions.body = data;
		}
    return this.http.request(new Request(requestOptions))
                    .map((res:Response) => {
                      var body = res.json();
                      log.debug("response for ", method, " ", action, " :", body);
                      if (customizer) {
                        return customizer(body);
                      } else {
                        return body;
                      }
                    }).catch((error) => {
                      log.error("Error doing ", method, " for action ", action, ":", error)
                      return error;
                    });
  }
  
  branches(options:GitOptions) {
    return AppHelpers.maybeInvoke(this.urlString, () => {
      return this.doMethod('listBranches', 'get', options);
    }, []);
  }

  getPage(options:GitOptions) {
    return AppHelpers.maybeInvoke(this.urlString, () => {
      return this.doMethod('content', 'get', options, (data) => {
        if (_.isArray(data)) {
          data = _.sortBy(data, (item:any) => {
            if (item.type === 'dir') {
              return '000' + item.name;
            }
            return '100' + item.name;
          });
        }
        return data;
      });
    }, []);
  }

  putPage(options:GitOptions) {
    // TODO
  }

  removePage(options:GitOptions) {
    // TODO
  }

  removePages(options:GitOptions) {
    // TODO
  }

  rename(options:GitOptions) {
    // TODO
  }

  revertTo(options:GitOptions) {
    // TODO
  }

  history(options:GitOptions) {
    // TODO
  }

  diff(options:GitOptions) {
    // TODO
  }

  exists(options:GitOptions) {
    // TODO
  }

  commitInfo(options:GitOptions) {
    // TODO
  }

  commitDetail(options:GitOptions) {
    // TODO
  }

  commitTree(options:GitOptions) {
    // TODO
  }
}
