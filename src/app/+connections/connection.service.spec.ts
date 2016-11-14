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

import { ConnectionService } from './connection.service';


describe('ConnectionService', () => {
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
            ConnectionService
        ]}));
    
    // Can't set this up until we have the API wired up,
    // maybe can use a mock backend instead in the meantime?
    /*
    it('should have http', inject([ ConnectionService ], (connection: ConnectionService) => {
        expect(!!connection.http).toEqual(true);
    }));
    */
  
    /*
     * TODO like above this probably needs mock data to work
    it('should get data from the server', inject([ ConnectionService ], (connection: ConnectionService) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        connection.getAll();
        expect(console.log).toHaveBeenCalled();
        expect(connection.getAll()).toEqual({ value: 'AngularClass' });
    }));
    */
    
});
