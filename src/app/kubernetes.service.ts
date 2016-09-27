import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.service';

@Injectable()
export class Kubernetes {

  private url:string = undefined;

  constructor(private http: Http, private appState: AppState) {
    this.url = appState.config.urls['KUBERNETES_MASTER'];
    console.log("Kubernetes service using URL: ", this.url);
  }

  getNamespaces():Observable<any> {
    return null;
  }

  getVersion():Observable<any> {
    if (!this.url) {
      console.log("No kubernetes URL set..");
      return Observable.of([]);
    }
    return this.http.get(this.url + '/version')
                    .map((res:Response) => {
                      var array = res.json();
                      // TODO, filter and sort the command list
                      return array;
                    })
                    .catch((error) => {
                      console.error("Error fetching version: ", error)
                      return error;
                    });
  }

}
