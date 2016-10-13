import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import * as URI from 'urijs';

import { AppHelpers } from './app';

describe('AppHelpers', () => {

  var gimmeTrue = () => {
    var source = Observable.create((observer) => {
      observer.next(true);
      observer.complete();
    });
    return source;
  };
  
  it('should invoke the supplied function when url is defined', () => {
    var url = 'http://localhost:8080';
    var invoked:boolean = undefined;
    AppHelpers.maybeInvoke(url, gimmeTrue, false).subscribe((i) => invoked = i);
    expect(invoked).toEqual(true);
  });

  it('should not invoke the function when url is not defined', () => {
    var url:string = undefined;
    var invoked:boolean = undefined;
    AppHelpers.maybeInvoke(url, gimmeTrue, false).subscribe((i) => invoked = i);
    expect(invoked).toEqual(false);
  });

  it('Should give me the base document path', () => {
    expect(AppHelpers.baseDocumentPath()).toEqual('/');
  });

  it('Should give me the base document URI', () => {
    var url = new URI().path('/').toString();
    expect(AppHelpers.baseDocumentUri().toString()).toEqual(url);
  });

});
