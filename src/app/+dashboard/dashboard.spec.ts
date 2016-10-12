import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { Dashboard } from './dashboard.component';
import { Title } from '../common/title';
import { AppState } from '../app.service';

describe('Dashboard', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        AppState,
        Title,
        Dashboard
      ]
    }));
   
    it('should have default data', inject([Dashboard], (dashboard) => {
        expect(dashboard.localState).toEqual('');
    }));
   
    /*
     * TODO dashboard currently doesn't have a title
    it('should have a title', inject([Dashboard], (dashboard) => {
        expect(!!dashboard.title).toEqual(true);
    }));
    */
    
    it('should log ngOnInit', inject([Dashboard], (dashboard) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        dashboard.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
});

