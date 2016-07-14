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
import {ClientApps} from './clientApps.component';
import {Title} from './title';
import {AppState} from '../app.service';

describe('ClientApps', () => {
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
    ClientApps
  ]);

  it('should have default data', inject([ ClientApps ], (clientApps) => {
    expect(clientApps.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ ClientApps ], (clientApps) => {
    expect(!!clientApps.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ ClientApps ], (clientApps) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    clientApps.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
