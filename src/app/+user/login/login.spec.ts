import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

// Load the implementations that should be tested
import {Login} from './login.component';

describe('Login', () => {
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
            Login
        ]
    }));
    
    it('should log ngOnInit', inject([Login], (login) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        login.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
    
});
