import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

// Load the implementations that should be tested
import {Reset} from './reset.component';

describe('Reset', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            // provide a better mock
            {
                provide: ActivatedRoute,
                useValue: {
                    data: {
                        subscribe: (fn) => fn({
                            yourData: 'yolo'
                        })
                    }
                }
            },
            Reset
        ]
    }));
    
    it('should log ngOnInit', inject([Reset], (reset) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        reset.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
    
});
