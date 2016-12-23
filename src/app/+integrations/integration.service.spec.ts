import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';

import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';


import { Component } from '@angular/core';

import { By } from '@angular/platform-browser/src/dom/debug/by';

import { MockBackend } from '@angular/http/testing';

import { IntegrationService } from './integration.service';


describe('IntegrationService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            BaseRequestOptions,
            MockBackend,
            {
                provide: Http,
                useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                    return new Http(backend, defaultOptions);
                },
                deps: [MockBackend, BaseRequestOptions]
            },
            IntegrationService
        ]}));
    
    // Can't set this up until we have the API wired up,
    // maybe can use a mock backend instead in the meantime?
    /*
    it('should have http', inject([ IntegrationService ], (integration: IntegrationService) => {
        expect(!!integration.http).toEqual(true);
    }));
    */
  
    /*
     * TODO like above this probably needs mock data to work
    it('should get data from the server', inject([ IntegrationService ], (integration: IntegrationService) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        integration.getAll();
        expect(console.log).toHaveBeenCalled();
        expect(integration.getAll()).toEqual({ value: 'AngularClass' });
    }));
    */
    
});
