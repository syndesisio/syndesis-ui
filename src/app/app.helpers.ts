import { Observable } from 'rxjs/Observable';

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

}
