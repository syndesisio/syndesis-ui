import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Dashboard } from './dashboard.component';
import { AppState } from '../app.service';

describe('Dashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboard ]
    });
    fixture = TestBed.createComponent(Dashboard);
    var comp = fixture.componentInstance;
  });
});


/*

 TODO this is all old
import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from '@angular/core/testing';

import { Component, provide } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { WebpackState } from '@angularclass/hmr';

// Load the implementations that should be tested
import { Dashboard } from './dashboard.component';
// import { Title } from './title';
import { AppState } from '../app.service';

describe('Dashboard', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        BaseRequestOptions,
        MockBackend,
        provide(Http, {
            useFactory: function (backend, defaultOptions) {
                return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        }),
        
        WebpackState,
        AppState,
        Title,
        Dashboard
    ]);
    
    it('should have default data', inject([Dashboard], (dashboard) => {
        expect(dashboard.localState).toEqual({value: ''});
    }));
    
    it('should have a title', inject([Dashboard], (dashboard) => {
        expect(!!dashboard.title).toEqual(true);
    }));
    
    it('should log ngOnInit', inject([Dashboard], (dashboard) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        dashboard.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
});

*/
