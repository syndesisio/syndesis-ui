import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

// Load the implementations that should be tested
import {Profile} from './profile.component';

describe('Profile', () => {
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
            Profile
        ]
    }));
    
    it('should log ngOnInit', inject([Profile], (profile) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        profile.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
    
});
