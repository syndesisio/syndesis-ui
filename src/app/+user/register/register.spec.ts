import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

// Load the implementations that should be tested
import {Register} from './register.component';

describe('Register', () => {
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
            Register
        ]
    }));
    
    it('should log ngOnInit', inject([Register], (register) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        register.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
    
});
