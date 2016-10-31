import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import * as _ from 'lodash';
import * as URI from 'urijs';

import { AppState } from './app.service';
import { Logger } from './common/service/log';

var log = Logger.get('OAuth');

export const OAUTH_AUTHORIZE_URI_KEY = 'oauth.authorizeUri';
export const OAUTH_CLIENT_ID_KEY = 'oauth.clientId';
export const OAUTH_LOGOUT_URI_KEY = 'oauth.logoutUri';
export const TOKEN_STORAGE_KEY = 'oauth.token';
export const TOKEN_EXPIRY_KEY = 'oauth.exiresIn';
export const TOKEN_TYPE_KEY = 'oauth.tokenType';
export const TOKEN_OBTAINED_AT_KEY = 'oauth.obtainedAt';
export const TOKEN_SCOPE_KEY = 'oauth.scope';

@Injectable()
export class OAuth {

	private _enabled = false;
	private _authorizeUri:uri.URI = undefined;
	private _logoutUri:uri.URI = undefined;
	private _clientId:string = undefined;

	constructor(private http:Http, private appState:AppState) {

	}

	/**
	 * Initializer called during app bootstrap
	 */
	public load() {
		let authorizeUri = this.appState.get(OAUTH_AUTHORIZE_URI_KEY);
		let clientId = this.appState.get(OAUTH_CLIENT_ID_KEY);
		if (!authorizeUri || !clientId) {
			log.info("disabled");
			return Observable.of([]).toPromise();
		}
		this._enabled = true;
		log.info("Enabled, authorize URI: ", this.authorizeUri.toString(), " clientId: ", this.clientId);
		// check for local token in local storage and check URL fragment
		var token = this.extractToken() || this.appState.get(TOKEN_STORAGE_KEY, true); 
		if (!token) {
			log.info("No token, logging in");
			this.doLogin();
			// just to avoid doing anything else here...
			return Observable.of([]).toPromise();
		}
		log.info("Have token, expires at ", this.expiresAt);
		// Try token and redirect to login if it doesn't work
		// TODO how to handle other providers?
		if (this.appState.get('k8sProvider') === 'openshift') {
			let url = this.authorizeUri.path('/oapi/v1/users/~').toString();
      let requestOptions = new RequestOptions({ 
				headers: new Headers({ 
					'Authorization': this.authHeader,
					'Content-Type': 'application/json' 
				})
			});
			requestOptions.withCredentials = true;
			let promise = this.http.get(url, requestOptions)
														 .map((res:Response) => {
															 return res.json();
														 })
														 .catch((error) => {
															 log.warn("Error fetching user details: ", error);
															 if (error.status === 401) {
																 this.doLogin();
															 }
															 return Observable.of({});
															 // TODO deal with other error responses
														 }).toPromise();
			promise.then((userInfo:any) => {
				log.debug("Got user info: ", userInfo);
				this.appState.set('user', userInfo);
				return this;
			});
			return promise;
		} else {
			return Observable.of([]).toPromise();
		}
	}

	/**
	 * Trigger the oauth logout flow
	 */
  public doLogout() {
    var currentURI = new URI(window.location.href);
    var uri = this.logoutUri;
    uri.segment(this.token);
		/*
		 * TODO
    authenticatedHttpRequest({
      type: 'DELETE',
      url: uri.toString()
    }, userDetails).always(() => {
      clearTokenStorage();
      doLogin(OSOAuthConfig, {
        uri: currentURI.toString()
      });
    });
		*/
  }

	/**
	 * Trigger the oauth login flow
	 */
  public doLogin(returnUri:string = window.location.href) {
    var clientId = this.clientId;
    var uri = this.authorizeUri;
    uri.query({
      client_id: clientId,
      response_type: 'token',
      state: returnUri,
      redirect_uri: returnUri
    });
    var target = uri.toString();
    log.debug("Redirecting to URI: ", target);
    window.location.href = target;
  }

	private extractToken(uri:uri.URI = new URI()) {
		var fragmentParams:any = new URI("?" + uri.fragment()).query(true);
		log.debug("Fragment parameters: ", fragmentParams);
		var answer:string = undefined;
		if (fragmentParams.access_token && (fragmentParams.token_type === "bearer") || fragmentParams.token_type === "Bearer") {
			log.debug("Got token from URL");
			_.forOwn(fragmentParams, (value, key) => {
				log.debug("Key: ", key, " value: ", value);
				switch (key) {
					case 'token_type':
						this.appState.set(TOKEN_TYPE_KEY, value, true);
						delete fragmentParams[key];
						break;
					case 'access_token':
						answer = value;
						this.appState.set(TOKEN_STORAGE_KEY, value, true);
						this.appState.set(TOKEN_OBTAINED_AT_KEY, Math.floor(new Date().getTime() / 1000), true);
						delete fragmentParams[key];
						break;
					case 'expires_in':
						this.appState.set(TOKEN_EXPIRY_KEY, value, true);
						delete fragmentParams[key];
						break;
					case 'scope':
						this.appState.set(TOKEN_SCOPE_KEY, value, true);
						delete fragmentParams[key];
						break;
					case 'state':
						// we don't need to save this
						delete fragmentParams[key];
						break;
					default:
						log.info("Unknown fragment parameter: ", key, " with value: ", value);
				}
			});
			uri.fragment("").query(fragmentParams);
			var target = uri.toString();
			log.debug("Redirecting to: ", target);
			window.location.href = target;
		} else {
			log.debug("No token in URL");
		}
		return answer;
	}

	public get tokenType():string {
		return this.appState.get(TOKEN_TYPE_KEY);
	}

	public get expiresIn():number {
		return parseInt(this.appState.get(TOKEN_EXPIRY_KEY) || 0);
	}

	public get obtainedAt():number {
		return parseInt(this.appState.get(TOKEN_OBTAINED_AT_KEY) || 0);
	}

	public get expiresAt():Date {
		return new Date((this.obtainedAt + this.expiresIn) * 1000);
	}

	public get enabled():boolean {
		return this._enabled;
	}

	public set enabled(enabled:boolean) {
		// disable setting this...
	}

	public get authorizeUri():uri.URI {
		let authorizeUri = this.appState.get(OAUTH_AUTHORIZE_URI_KEY);
		if (!authorizeUri) {
			return undefined;
		}
		return new URI(authorizeUri);
	}

	public get clientId():string {
		return this.appState.get(OAUTH_CLIENT_ID_KEY);
	}

	public get logoutUri():uri.URI {
		var logoutUri = this.appState.get(OAUTH_LOGOUT_URI_KEY);
		if (!logoutUri || logoutUri === '') {
			// TODO this is kinda openshift specific
			let authorizeUri = this.appState.get(OAUTH_AUTHORIZE_URI_KEY);
			return new URI(authorizeUri).path('/oapi/v1/oAuthAccessTokens');
		}
		return new URI(logoutUri);
	}

	public get token():string {
		return this.appState.get(TOKEN_STORAGE_KEY);
	}

	/*
	 * The authorization header value if enabled
	 */
	public get authHeader():string {
		if (!this.enabled) {
			return undefined;
		}
		return this.tokenType + ' ' + this.token;
	}

	/*
	 * Add OAuth credentials to a RequestOptions object
	 */
	public addCredentials(requestOptions:RequestOptions):RequestOptions {
		if (this.enabled) {
			requestOptions.withCredentials = true;
			this.appendAuthHeader(requestOptions.headers);
		}
		return requestOptions;
	}

	/*
	 * Add the Authorization header to a Headers object
	 */
	public appendAuthHeader(headers:Headers):Headers {
		if (this.enabled) {
			headers.append('Authorization', this.authHeader);
		}
		return headers;
	}

}
