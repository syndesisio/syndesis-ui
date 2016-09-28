import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

// Load the implementations that should be tested
import {User} from './user.component';

describe('User', () => {
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
            User
        ]
    }));
    
    it('should log ngOnInit', inject([User], (user) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        user.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
    
});
