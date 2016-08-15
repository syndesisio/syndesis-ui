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
import {Portal} from './portal.component.ts';
import {Title} from './title';
import {AppState} from '../app.service';

describe('API Portal', () => {
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
    Portal
  ]);

  it('should have default data', inject([ Portal ], (portal) => {
    expect(portal.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Portal ], (portal) => {
    expect(!!portal.title).toEqual(true);
  }));

  it('should log ngOnInit', inject([ Portal ], (portal) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    portal.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
