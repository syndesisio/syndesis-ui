import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import {Component, provide} from 'angular2/core';
import {BaseRequestOptions, Http} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {WebpackState} from 'angular2-hmr';

// Load the implementations that should be tested
import {Login} from './login.component';
import {Title} from '../title';
import {AppState} from '../../app.service';

describe('Login', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    WebpackState,
    AppState,
    Title,
    Login
  ]);

  it('should have default data', inject([ Login ], (login) => {
    expect(login.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Login ], (login) => {
    expect(!!login.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Login ], (login) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    login.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
