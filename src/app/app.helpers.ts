import { Observable } from 'rxjs/Observable';
import * as URI from 'urijs';

// Simple helper functions for common tasks
export module AppHelpers {

  // if the given URL is defined, invoke the function, otherwise
  // return an empty value
  export function maybeInvoke(url:string, fn: () => Observable<any>, empty:any = {}) {
    if (!url) {
      return Observable.of(empty);
    }
    return fn();
  }

  // local cached value that contains the document base
  var cachedBase:string = undefined;

  // local cached value that contains the absolute document URL
  var cachedBaseUri:uri.URI = undefined;

  /*
   * Returns the value of the <base> tag
   */
  export function baseDocumentPath():string {
    if (cachedBase) {
      return cachedBase;
    }
    var base = document.querySelector('base');
    if (base) {
      cachedBase = base.getAttribute('href');
    } else {
      cachedBase = '/';
    }
    return cachedBase;
  }

  /*
   * Returns the absolute URL to the document
   */
  export function baseDocumentUri():uri.URI {
    // we only need to figure this out once
    if (cachedBaseUri) {
      return cachedBaseUri.clone();
    }
    cachedBaseUri = new URI().path(baseDocumentPath()).query('').fragment('');
    return cachedBaseUri.clone();
  }

}
