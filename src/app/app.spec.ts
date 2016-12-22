import {
  inject,
  TestBed
} from '@angular/core/testing';

// Load the implementations that should be tested
import { HttpModule } from '@angular/http';
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

    it('should have a Twitter url', inject([ App ], (app) => {
        expect(app.twitterUrl).toEqual('https://www.twitter.com/jboss');
    }));

});
