import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { BaseRequestOptions, Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { App } from './app.component';
import { AppState } from './app.service';

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
          HttpModule
        ],
        providers: [
            AppState,
            App
        ]
    }));
    
    it('should have a url', inject([App], (app) => {
      expect(app.url).toEqual('https://www.twitter.com/jboss');
    }));
    
});
