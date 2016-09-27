import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppState } from './app.service';
import { AppHelpers } from './app.helpers';

@Injectable()
export class Kubernetes {

  private url:string = undefined;

  constructor(private http: Http, private appState: AppState) {
    this.url = appState.config.urls['KUBERNETES_MASTER'];
    console.log("Kubernetes service using URL: ", this.url);
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
                        console.error("Error fetching namespaces: ", error)
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
                    console.error("Error fetching version: ", error)
                    return error;
                  });
    });
  }

}
